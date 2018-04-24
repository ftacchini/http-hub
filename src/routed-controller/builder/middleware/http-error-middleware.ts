import { HttpTypes } from './../../../http-types';
import { injectable } from 'inversify';
import { inject } from 'inversify';
import { Router as ExpressRouter, RequestHandler } from "express";
import { ConstructorMiddlewareBuilder, ControllerActivator, Middleware, Types, TsHubLogger } from "ts-hub";
import { ErrorRequestHandler } from 'express-serve-static-core';

@injectable()
export class HttpErrorMiddleware extends ConstructorMiddlewareBuilder<any, ExpressRouter, ErrorRequestHandler>  {

    constructor(
        @inject(HttpTypes.HttpErrorActivator) controllerActivator: ControllerActivator<ExpressRouter, ErrorRequestHandler>,
        @inject(Types.TsHubLogger) tsHubLogger: TsHubLogger) {
            super(controllerActivator, tsHubLogger);
    }

    public supportsRouter(router: ExpressRouter): boolean {
        return Object.getPrototypeOf(router) == ExpressRouter;
    }

}