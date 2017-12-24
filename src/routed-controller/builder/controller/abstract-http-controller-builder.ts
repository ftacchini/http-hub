import { RoutedControllerBuilder, Server, MiddlewareReader, RouteReader, Types } from "ts-hub";
import { HttpControllerInformation } from "../../information";
import { HttpController } from "../../http-controller";
import { HttpServer } from "../../../server/http-server";
import { Router as ExpressRouter, RequestHandler } from "express";
import { injectable, inject } from "inversify";

const controllerRegex: RegExp = /(Controller|controller)$/;

@injectable()
export abstract class AbstractHttpControllerBuilder extends RoutedControllerBuilder<HttpControllerInformation, ExpressRouter, RequestHandler, HttpController> {

    constructor(@inject(Types.MiddlewareReader) middlewareReader: MiddlewareReader,
                @inject(Types.RouteReader) routeReader: RouteReader){
        super(middlewareReader, routeReader);

    }

    public buildController() : HttpController {
        this.information || (this.information = new HttpControllerInformation());
        this.information.name || (this.information.name = this.defaultControllerName());
        return super.buildController();
    }

    private defaultControllerName(): string {
        return this.target.name.replace(controllerRegex, ""); 
    }

    public abstract supportsServer(server: Server) : boolean;

    protected buildRoutedController() : HttpController {
        return new HttpController();
    }
    
}