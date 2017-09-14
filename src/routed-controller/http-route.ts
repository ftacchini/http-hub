import { Route, Middleware } from "ts-hub"
import { HttpRouteInformation } from "./information";
import { HttpRouteType } from "../http-route-type";
import { Router as ExpressRouter, RequestHandler } from "express";

export class HttpRoute implements Route<HttpRouteInformation, ExpressRouter, RequestHandler> {

    public information: HttpRouteInformation;
    public middleware: Middleware<any, RequestHandler>[];
    attachToServer(server: ExpressRouter): ExpressRouter {
        var handlers = this.middleware.map(middleware => middleware.getRequestHandler());
        var route = server[this.information.type](`/${this.information.path}`, handlers);
        
        return route;
    }
}