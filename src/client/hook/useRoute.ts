import { useCallback, useState } from "react";

const useRoute = <C extends (i: any) => Promise<any>>(client: C) => {
  const [data, setData] = useState<Awaited<ReturnType<C>>>();
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(false);
  const callRoute = useCallback(
    async (input: Parameters<C>[0]) => {
      setLoading(true);
      let res: Awaited<ReturnType<C>> | undefined = undefined;
      try {
        res = await client(input);
        setData(res);
      } catch (e: any) {
        setError(e);
      } finally {
        setLoading(false);
        return res;
      }
    },
    [client]
  );
  return [callRoute, { data, error, loading }] as const;
};

export default useRoute;
