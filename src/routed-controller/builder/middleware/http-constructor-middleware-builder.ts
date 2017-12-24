import { injectable } from 'inversify';
import { inject } from 'inversify';
import { Router as ExpressRouter, RequestHandler } from "express";
import { ConstructorMiddlewareBuilder, ControllerActivator, Handler, Middleware, Types, TsHubLogger } from "ts-hub";

@injectable()
export class HttpConstructorMiddlewareBuilder extends ConstructorMiddlewareBuilder<any, ExpressRouter, RequestHandler>  {

    constructor(
        @inject(Types.HttpControllerActivator) controllerActivator: ControllerActivator<ExpressRouter, RequestHandler>,
        @inject(Types.TsHubLogger) tsHubLogger: TsHubLogger) {
            super(controllerActivator, tsHubLogger);
    }

    public supportsRouter(router: ExpressRouter): boolean {
        return Object.getPrototypeOf(router) == ExpressRouter;
    }

}