declare const useCachedRoute: <R extends {
    apiUrl: string;
    path: string;
    routeMiddleware: import("../../types").Middleware[];
    inputShape: import("zod/lib/types").AnyZodObject;
    outputShape: import("zod/lib/types").AnyZodObject;
    clientShape: import("zod").ZodFunction<import("zod").ZodTuple<[import("zod/lib/types").AnyZodObject], import("zod").ZodUnknown>, import("zod").ZodPromise<import("zod/lib/types").AnyZodObject>>;
    serviceShape: import("zod").ZodFunction<import("zod").ZodTuple<[import("zod").ZodObject<{
        input: import("zod/lib/types").AnyZodObject;
        context: import("zod/lib/types").AnyZodObject;
        req: import("zod").ZodAny;
        res: import("zod").ZodAny;
    }, "strip", import("zod").ZodTypeAny, {
        req?: any;
        res?: any;
        input: {
            [x: string]: any;
        };
        context: {
            [x: string]: any;
        };
    }, {
        req?: any;
        res?: any;
        input: {
            [x: string]: any;
        };
        context: {
            [x: string]: any;
        };
    }>], import("zod").ZodUnknown>, import("zod").ZodPromise<import("zod/lib/types").AnyZodObject>>;
    contextShape: import("zod/lib/types").AnyZodObject;
    handler: (h: import("../../types").Handler<import("zod/lib/types").AnyZodObject, import("zod/lib/types").AnyZodObject, import("zod/lib/types").AnyZodObject>) => import("next").NextApiHandler<{
        [x: string]: any;
    }>;
    client: () => import("../../types").Client<import("zod/lib/types").AnyZodObject, import("zod/lib/types").AnyZodObject>;
    middleware: (...fns: import("../../types").Middleware[]) => void;
}>(route: R) => readonly [(input: Parameters<ReturnType<R["client"]>>[0]) => Promise<ReturnType<Awaited<ReturnType<R["client"]>>>>, {
    readonly data: Awaited<ReturnType<Awaited<ReturnType<R["client"]>>>>;
    readonly error: string | null;
    readonly loading: boolean;
}];
export default useCachedRoute;
