import { injectable } from 'inversify';
import { inject } from 'inversify';
import { Router as ExpressRouter, RequestHandler } from "express";
import { ConstructorMiddlewareBuilder, ControllerActivator, Handler, Middleware, Types } from "ts-hub";

@injectable()
export class HttpConstructorMiddlewareBuilder extends ConstructorMiddlewareBuilder<any, ExpressRouter, RequestHandler>  {

    public information: any;
    public target: any;
    public propertyKey: string;
    public arg: number;
    public middlewareConstructor: new (...args: any[]) => Handler<any>

    protected get priority() : number{
        return this.information.priority || 0;
    }

    constructor(
        @inject(Types.HttpControllerActivator) controllerActivator: ControllerActivator<ExpressRouter, RequestHandler>) {
            super(controllerActivator);
    }

    public supportsRouter(router: ExpressRouter): boolean {
        return Object.getPrototypeOf(router) == ExpressRouter;
    }

}