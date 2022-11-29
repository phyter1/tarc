import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import type {
  Client,
  ClientMap,
  CreateContext,
  Handler,
  HandlerMap,
  Method,
  Middleware,
  ZO,
} from "../types/coreTypes";
import { z } from "zod";
import querystring from "query-string";

const ClientMap: ClientMap<ZO, ZO> = new Map([
  [
    "get",
    ({ apiUrl, path, inputShape, outputShape }) =>
      async (input) => {
        const reqInput = inputShape.parse(input);
        const output = await fetch(
          apiUrl +
            path +
            "?" +
            querystring.stringify(reqInput, { encode: true }),
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        return outputShape.parse(await output.json());
      },
  ],
  [
    "post",
    ({ apiUrl, path, inputShape, outputShape }) =>
      async (input) => {
        const reqInput = inputShape.parse(input);
        const res = await fetch(apiUrl + path, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reqInput),
        });
        const reqOutput = await res.json();
        return outputShape.parse(reqOutput);
      },
  ],
]);

const HandlerMap: HandlerMap<ZO, ZO, ZO> = new Map([
  [
    "get",
    ({ inputShape, outputShape, context, handler }) =>
      async (req, res) => {
        const input = inputShape.parse(req.query);
        const output = await handler({ req, res, context, input });
        res.status(200).json(outputShape.parse(output));
      },
  ],
  [
    "post",
    ({ inputShape, outputShape, context, handler }) =>
      async (req, res) => {
        const input = inputShape.parse(req.body);
        const output = await handler({ req, res, context, input });
        res.status(200).json(outputShape.parse(output));
      },
  ],
]);

const Router = <C extends ZO>({
  contextShape,
  apiUrl = "/api",
}: {
  contextShape: C;
  apiUrl?: string;
}) => {
  let createContext: CreateContext<z.infer<C>>;
  const context = (create: CreateContext<z.infer<C>>) => {
    createContext = create;
  };
  const getCreateContext = () => {
    if (!createContext) {
      throw new Error("createContext not set");
    }
    return createContext;
  };
  const methodClients = (clients: ClientMap<ZO, ZO>) => {
    for (const [method, client] of clients) {
      ClientMap.set(method, client);
    }
  };
  const methodHandlers = (handlers: HandlerMap<ZO, ZO, ZO>) => {
    for (const [method, handler] of handlers) {
      HandlerMap.set(method, handler);
    }
  };
  const route = <I extends ZO, O extends ZO>({
    method,
    path,
    inputShape,
    outputShape,
  }: {
    method: Method;
    path: string;
    inputShape: I;
    outputShape: O;
  }) => {
    let routeMiddleware: Middleware[] = [];

    const middleware = (...fns: Middleware[]) => {
      routeMiddleware = [...routeMiddleware, ...fns];
    };

    const methodHandler = HandlerMap.get(method) ?? HandlerMap.get("post")!;

    const handler = (h: Handler<C, I, O>): NextApiHandler<z.infer<O>> => {
      return async (req: NextApiRequest, res: NextApiResponse<z.infer<O>>) => {
        for (const m of routeMiddleware || []) {
          await m(req, res);
        }

        const context = await getCreateContext()(req, res);

        if (!context) {
          res.status(500).json({ status: "error", message: "no context" });
          return;
        }
        return methodHandler({
          inputShape,
          outputShape,
          context: await createContext(req, res),
          handler: h as any,
        })(req, res);
      };
    };

    const client = (): Client<I, O> => {
      const c = (ClientMap.get(method) ?? ClientMap.get("post")!)({
        apiUrl,
        path,
        inputShape,
        outputShape,
      });
      return c as any;
    };

    return {
      apiUrl,
      path,
      routeMiddleware,
      inputShape,
      outputShape,
      contextShape,
      handler,
      client,
      middleware,
    };
  };
  return { route, context, methodHandlers, methodClients };
};

type Router = ReturnType<typeof Router>;

export default Router;
