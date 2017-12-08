import { Types } from "ts-hub";

Types.HttpControllerActivator = Symbol("HttpControllerActivator");

export * from "./server";
export * from "./routed-controller";
export * from "./http-route-type";