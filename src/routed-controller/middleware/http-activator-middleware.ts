import { RequestHandler } from 'express';
import { Middleware } from 'ts-hub';
import { ErrorRequestHandler } from 'express-serve-static-core';
import { ExecutionOrder } from 'ts-hub/dts/src/routed-controller/execution-order';

export class HttpActivatorMiddleware<HttpRequestHandler extends RequestHandler | ErrorRequestHandler> implements Middleware<null, HttpRequestHandler> {
    public readonly priority: number = 0;
    public readonly information: null = null;
    public readonly executionOrder: ExecutionOrder;

    constructor(private requestHandler: HttpRequestHandler) {

    }

    public getRequestHandler(): HttpRequestHandler {
        return this.requestHandler;
    }
}