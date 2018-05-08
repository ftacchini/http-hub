import { RoutedController, Middleware, Route, ExecutionOrder } from "ts-hub";
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

        var preActivationHandlers = this.middleware
            .filter(middleware => middleware.executionOrder == ExecutionOrder.PreActivation)
            .sort(middleware => middleware.priority)
            .map(middleware => middleware.getRequestHandler());
        
        preActivationHandlers.length && this.router.use(preActivationHandlers);
        
        this.routes.forEach(route => route.attachToServer(this.router));
        
        var postActivationHandlers = this.middleware
            .filter(middleware => middleware.executionOrder == ExecutionOrder.PostAcivation)
            .sort(middleware => middleware.priority)
            .map(middleware => middleware.getRequestHandler());
        
        postActivationHandlers.length && this.router.use(postActivationHandlers);
        
        server.application.use(`/${this.information.name}`, this.router);

        return this.router;
    }
}