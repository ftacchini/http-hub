import { HttpTypes } from './../../../http-types';
import { HttpVerb } from './../../../http-route-type';
import { MiddlewareReader, ControllerActivator, Middleware, Types, TsHubLogger } from "ts-hub";
import { HttpRouteBuilder } from "./http-route-builder";
import { HttpRouteType } from "../../../http-route-type";
import { Router, RequestHandler } from "express";
import { injectable, inject } from "inversify";

@injectable()
export class HttpHead extends HttpRouteBuilder {

    constructor(
        @inject(Types.MiddlewareReader) middlewareReader: MiddlewareReader, 
        @inject(HttpTypes.HttpControllerActivator) controllerActivator: ControllerActivator<Router, RequestHandler>,
        @inject(Types.TsHubLogger) tsHubLogger: TsHubLogger) {
        super(middlewareReader, controllerActivator, tsHubLogger);
    }

    public getDefaultRouteType(): HttpRouteType {
        return HttpVerb.HEAD;
    }

    
}