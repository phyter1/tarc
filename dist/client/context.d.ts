import type { FC, ReactNode } from "react";
import { Clients } from "../types/coreTypes";
import type { Router } from "../router";
declare const RouterContextProvider: FC<{
    children: ReactNode;
    router?: Router;
    clients?: Clients;
}>;
export default RouterContextProvider;
