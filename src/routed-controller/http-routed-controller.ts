import { RoutedController, Middleware, Route } from "ts-hub";
import { HttpServer } from "../server/http-server";
import { HttpControllerInformation } from "./information";
import { Router as ExpressRouter, RequestHandler } from "express";

export class HttpRoutedController implements RoutedController<HttpControllerInformation, ExpressRouter, RequestHandler> {

    public information: HttpControllerInformation;
    public middleware: Middleware<any, ExpressRouter>[];
    public routes: Route<any, ExpressRouter, RequestHandler>[];
    public router: ExpressRouter;

    constructor() {
        this.router = ExpressRouter(); 
    }

    public attachToServer(server: HttpServer) : ExpressRouter {

        var handlers = this.middleware
            .map(middleware => middleware.getRequestHandler());
        
        handlers.length && this.router.use(handlers);
        
        this.routes.forEach(route => route.attachToServer(this.router));
        server.application.use(`/${this.information.name}`, this.router);

        return this.router;
    }
}