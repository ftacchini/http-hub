import { Types } from "ts-hub";

Types.HttpControllerActivator = Symbol("HttpControllerActivator");

export * from "./server";
export * from "./routed-controller";
export * from "./http-route-type";

import * as HttpStatus from 'http-status-codes'
export const HttpStatusCodes = HttpStatus;