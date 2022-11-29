import type { FC, ReactNode } from "react";
import { Clients } from "../types/coreTypes";
import type { Router } from "../router";
import React, { useEffect, useRef } from "react";
import { RecoilRoot } from "recoil";

const RouterContextProvider: FC<{
  children: ReactNode;
  router?: Router;
  clients?: Clients;
}> = ({ children, clients, router }) => {
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current && clients && router) {
      mounted.current = true;
      router.methodClients(clients);
    }
  }, [router, clients]);
  return <RecoilRoot>{children}</RecoilRoot>;
};

export default RouterContextProvider;
