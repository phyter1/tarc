import { useCallback } from "react";
import { atomFamily, selectorFamily, useRecoilState } from "recoil";
import { Route } from "../../types";

type UseRoute = {
  loading: boolean;
  error: string | null;
  data: any | null;
};

const routeCache = atomFamily<UseRoute, string>({
  key: "routeCache",
  default: {} as any,
});

const routeLoading = selectorFamily<boolean, string>({
  key: "routeLoading",
  get:
    (key) =>
    ({ get }) =>
      get(routeCache(key)).loading,
  set:
    (key) =>
    ({ set }, loading) => {
      set(routeCache(key), (prev) => ({
        ...prev,
        loading: loading as boolean,
      }));
    },
});

const routeError = selectorFamily<string | null, string>({
  key: "routeError",
  get:
    (key) =>
    ({ get }) =>
      get(routeCache(key)).error,
  set:
    (key) =>
    ({ set }, error) => {
      set(routeCache(key), (prev) => ({
        ...prev,
        error: error as string | null,
      }));
    },
});

const routeData = selectorFamily<any | null, string>({
  key: "routeData",
  get:
    (key) =>
    ({ get }) =>
      get(routeCache(key)).data,
  set:
    (key) =>
    ({ set }, data) => {
      set(routeCache(key), (prev) => ({
        ...prev,
        data: data as any | null,
      }));
    },
});

const useCachedRoute = <R extends Omit<Route, "handler">>(route: R) => {
  type I = Parameters<ReturnType<R["client"]>>[0];
  type O = Awaited<ReturnType<Awaited<ReturnType<R["client"]>>>>;
  const name = route.apiUrl + route.path;
  const client = route.client();
  const [data, setData] = useRecoilState<O>(routeData(name));
  const [error, setError] = useRecoilState(routeError(name));
  const [loading, setLoading] = useRecoilState(routeLoading(name));
  const callRoute = useCallback(
    async (input: I) => {
      setLoading(true);
      let res: O;
      try {
        res = (await client(input)) as any;
        setData(res);
      } catch (e: any) {
        setError(e);
      } finally {
        setLoading(false);
        return res!;
      }
    },
    [route]
  );
  return [callRoute, { data, error, loading }] as const;
};

export default useCachedRoute;
