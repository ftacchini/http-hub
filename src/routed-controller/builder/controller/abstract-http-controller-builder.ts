import { RoutedControllerBuilder, Server, MiddlewareReader, RouteReader, Types, TsHubLogger } from "ts-hub";
import { HttpControllerInformation } from "../../information";
import { HttpRoutedController } from "../../http-routed-controller";
import { HttpServer } from "../../../server/http-server";
import { Router as ExpressRouter, RequestHandler } from "express";
import { injectable, inject } from "inversify";

const controllerRegex: RegExp = /(Controller|controller)$/;

@injectable()
export abstract class AbstractHttpControllerBuilder extends RoutedControllerBuilder<HttpControllerInformation, ExpressRouter, RequestHandler, HttpRoutedController> {

    constructor(@inject(Types.MiddlewareReader) middlewareReader: MiddlewareReader,
                @inject(Types.RouteReader) routeReader: RouteReader,
                @inject(Types.TsHubLogger) tsHubLogger: TsHubLogger){
        super(middlewareReader, routeReader, tsHubLogger);

    }

    public buildController() : HttpRoutedController {
        this.information || (this.information = {});
        this.information.name || (this.information.name = this.defaultControllerName());
        return super.buildController();
    }

    private defaultControllerName(): string {
        return this.target.name.replace(controllerRegex, ""); 
    }

    public abstract supportsServer(server: Server) : boolean;

    protected buildRoutedController() : HttpRoutedController {
        return new HttpRoutedController();
    }
    
}