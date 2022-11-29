declare const useCachedRoute: <R extends Omit<{
    apiUrl: string;
    path: string;
    routeMiddleware: import("../../types").Middleware[];
    inputShape: import("zod/lib/types").AnyZodObject;
    outputShape: import("zod/lib/types").AnyZodObject;
    contextShape: import("zod/lib/types").AnyZodObject;
    handler: (h: import("../../types").Handler<import("zod/lib/types").AnyZodObject, import("zod/lib/types").AnyZodObject, import("zod/lib/types").AnyZodObject>) => import("next").NextApiHandler<{
        [x: string]: any;
    }>;
    client: () => import("../../types").Client<import("zod/lib/types").AnyZodObject, import("zod/lib/types").AnyZodObject>;
    middleware: (...fns: import("../../types").Middleware[]) => void;
}, "handler">>(route: R) => readonly [(input: Parameters<ReturnType<R["client"]>>[0]) => Promise<ReturnType<Awaited<ReturnType<R["client"]>>>>, {
    readonly data: Awaited<ReturnType<Awaited<ReturnType<R["client"]>>>>;
    readonly error: string | null;
    readonly loading: boolean;
}];
export default useCachedRoute;
