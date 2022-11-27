import type { NextApiHandler as NAH, NextApiRequest as NARQ, NextApiResponse as NARS } from "next";
import type { AnyZodObject as ZO, infer as INF } from "zod";
export type { AnyZodObject as ZO, infer as INF } from "zod";
export type CreateContext<C extends INF<ZO>> = (req: NARQ, res: NARS) => C | Promise<C>;
export type Middleware = (req: NARQ, res: NARS) => void | Promise<void>;
export type Endpoint<T extends INF<ZO>> = NAH<T>;
export type Method = "get" | "post" | "put" | "patch" | "delete";
export type Client<I extends ZO, O extends ZO> = (input: INF<I>) => Promise<INF<O>>;
export type ClientWrapper<I extends ZO, O extends ZO> = (params: {
    apiUrl: string;
    path: string;
    inputShape: I;
    outputShape: O;
}) => Client<I, O>;
export type ClientMap<I extends ZO, O extends ZO> = Map<Method, ClientWrapper<I, O>>;
export type Clients = ClientMap<ZO, ZO>;
export type Handler<C extends ZO, I extends ZO, O extends ZO> = (params: {
    req: NARQ;
    res: NARS;
    context: INF<C>;
    input: INF<I>;
}) => Promise<INF<O>>;
export type HandlerWrapper<C extends ZO, I extends ZO, O extends ZO> = (params: {
    inputShape: I;
    outputShape: O;
    context: INF<C>;
    handler: Handler<C, I, O>;
}) => Endpoint<INF<O>>;
export type HandlerMap<C extends ZO, I extends ZO, O extends ZO> = Map<Method, HandlerWrapper<C, I, O>>;
