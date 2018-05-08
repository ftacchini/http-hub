import { RequestHandler, Router as ExpressRouter } from 'express';
import { ExecutionOrder, Middleware, Route } from 'ts-hub';

import { HttpRouteInformation } from './information';

export class HttpRoute implements Route<HttpRouteInformation, ExpressRouter, RequestHandler> {

    public information: HttpRouteInformation;
    public middleware: Middleware<any, RequestHandler>[];
    public attachToServer(server: ExpressRouter): ExpressRouter {

        var handlers = this.middleware
            .sort(middleware => middleware.priority)
            .sort(middleware => middleware.executionOrder)
            .map(middleware => middleware.getRequestHandler());

        var route = server[this.information.type](`/${this.information.path}`, handlers);

        return route;
    }
}