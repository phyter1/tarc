import type { NextApiHandler } from "next";
import type { Client, ClientMap, CreateContext, Handler, HandlerMap, Method, Middleware, ZO } from "../types/coreTypes";
import { z } from "zod";
declare const ClientMap: ClientMap<ZO, ZO>;
declare const HandlerMap: HandlerMap<ZO, ZO, ZO>;
declare const Router: <C extends ZO>({ contextShape, apiUrl, }: {
    contextShape: C;
    apiUrl?: string | undefined;
}) => {
    route: <I extends ZO, O extends ZO>({ method, path, inputShape, outputShape, }: {
        method: Method;
        path: string;
        inputShape: I;
        outputShape: O;
    }) => {
        apiUrl: string;
        path: string;
        routeMiddleware: Middleware[];
        inputShape: I;
        outputShape: O;
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
