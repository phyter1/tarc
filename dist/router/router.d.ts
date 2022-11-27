import type { NextApiHandler } from "next";
import type { Client, ClientMap, CreateContext, Handler, HandlerMap, Middleware, ZO } from "../types/coreTypes";
import { z } from "zod";
declare const ClientMap: ClientMap<ZO, ZO>;
declare const HandlerMap: HandlerMap<ZO, ZO, ZO>;
declare const Router: <C extends ZO>({ contextShape, apiUrl, }: {
    contextShape: C;
    apiUrl?: string | undefined;
}) => {
    route: <I extends ZO, O extends ZO>({ method, path, inputShape, outputShape, }: {
        method: "get" | "post";
        path: string;
        inputShape: I;
        outputShape: O;
    }) => {
        apiUrl: string;
        path: string;
        routeMiddleware: Middleware[];
        inputShape: I;
        outputShape: O;
        clientShape: z.ZodFunction<z.ZodTuple<[I], z.ZodUnknown>, z.ZodPromise<O>>;
        serviceShape: z.ZodFunction<z.ZodTuple<[z.ZodObject<{
            input: I;
            context: C;
            req: z.ZodAny;
            res: z.ZodAny;
        }, "strip", z.ZodTypeAny, z.objectUtil.addQuestionMarks<{
            input: I["_output"];
            context: C["_output"];
            req: any;
            res: any;
        }> extends infer T ? { [k_1 in keyof T]: z.objectUtil.addQuestionMarks<{
            input: I["_output"];
            context: C["_output"];
            req: any;
            res: any;
        }>[k_1]; } : never, z.objectUtil.addQuestionMarks<{
            input: I["_input"];
            context: C["_input"];
            req: any;
            res: any;
        }> extends infer T_1 ? { [k_3 in keyof T_1]: z.objectUtil.addQuestionMarks<{
            input: I["_input"];
            context: C["_input"];
            req: any;
            res: any;
        }>[k_3]; } : never>], z.ZodUnknown>, z.ZodPromise<O>>;
        contextShape: C;
        handler: (h: Handler<C, I, O>) => NextApiHandler<z.TypeOf<O>>;
        client: () => Client<I, O>;
        middleware: (...fns: Middleware[]) => void;
    };
    context: (create: CreateContext<z.TypeOf<C>>) => void;
    methodHandlers: (handlers: HandlerMap<ZO, ZO, ZO>) => void;
    methodClients: (clients: ClientMap<ZO, ZO>) => void;
};
type Router = ReturnType<typeof Router>;
export default Router;
