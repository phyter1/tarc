declare const useRoute: <C extends (i: any) => Promise<any>>(client: C) => readonly [(input: Parameters<C>[0]) => Promise<ReturnType<C> | undefined>, {
    readonly data: Awaited<ReturnType<C>> | undefined;
    readonly error: Error | undefined;
    readonly loading: boolean;
}];
export default useRoute;
