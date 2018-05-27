import { HttpTypes } from './../../../http-types';
import { injectable } from 'inversify';
import { inject } from 'inversify';
import { Router as ExpressRouter, RequestHandler } from "express";
import { AbstractMiddlewareBuilder, ControllerActivator, Middleware, Types, TsHubLogger } from "ts-hub";

@injectable()
export class HttpMiddleware extends AbstractMiddlewareBuilder<any, ExpressRouter, RequestHandler>  {

    constructor(
        @inject(HttpTypes.HttpControllerActivator) controllerActivator: ControllerActivator<ExpressRouter, RequestHandler>,
        @inject(Types.TsHubLogger) tsHubLogger: TsHubLogger) {
            super(controllerActivator, tsHubLogger);
    }

    public supportsRouter(router: ExpressRouter): boolean {
        return Object.getPrototypeOf(router) == ExpressRouter;
    }

}