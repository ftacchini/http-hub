import { RequestHandler } from 'express';
import { HttpMiddleware } from './http-middleware';

export class HttpActivatorMiddleware implements HttpMiddleware<null>{
    public readonly priority: number = 0;
    public readonly information: null = null;

    constructor(private requestHandler: RequestHandler) {

    }

    public getRequestHandler(): RequestHandler {
        return this.requestHandler;
    }
}