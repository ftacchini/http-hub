import { injectable, unmanaged } from 'inversify';
import { MiddlewareReader, RouteReader, ControllerActivator, Middleware, DefaultRouteBuilder } from "ts-hub";
import { HttpRouteInformation } from "../../information";
import { HttpRouteType } from "../../../http-route-type";
import { Router as ExpressRouter, RequestHandler } from "express";
import { HttpRoute } from "../../http-route";
import * as _ from "lodash";

@injectable()
export abstract class HttpRouteBuilder extends DefaultRouteBuilder<HttpRouteInformation, ExpressRouter, RequestHandler> {

    constructor(
        @unmanaged() middlewareReader: MiddlewareReader, 
        @unmanaged() controllerActivator: ControllerActivator<ExpressRouter, RequestHandler>) {
        super(middlewareReader, controllerActivator);
    }

    public supportsRouter(router: ExpressRouter): boolean {
        return Object.getPrototypeOf(router) == ExpressRouter;
    }

    public abstract getDefaultRouteType(): HttpRouteType;


    public buildRoute(router: ExpressRouter): HttpRoute {

        var information: HttpRouteInformation = {};
        this.information = (this.information &&  _.merge(information, this.information)) || information;
        this.information.path || (this.information.path = this.propertyKey);
        this.information.type || (this.information.type = this.getDefaultRouteType());
        
        return super.buildRoute(router);
    }

    protected createRouteInstance(): HttpRoute {
        return new HttpRoute();
    }

    
}