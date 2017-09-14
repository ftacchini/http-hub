import { MiddlewareReader, ControllerActivator, Middleware, Types } from "ts-hub";
import { HttpRouteBuilder } from "./http-route-builder";
import { HttpRouteType } from "../../../http-route-type";
import { Router, RequestHandler } from "express";
import { injectable, inject } from "inversify";
import "reflect-metadata";

@injectable()
export class HttpPostBuilder extends HttpRouteBuilder {

    constructor(
        @inject(Types.MiddlewareReader) middlewareReader: MiddlewareReader, 
        @inject(Types.HttpControllerActivator) controllerActivator: ControllerActivator<Router, RequestHandler>) {
        super(middlewareReader, controllerActivator);
    }

    public getDefaultRouteType(): HttpRouteType {
        return "post";
    }

    
}