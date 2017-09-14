import { RequestHandler } from 'express';
import { Middleware } from 'ts-hub';

export interface HttpMiddleware<Information> extends Middleware<Information, RequestHandler> {
    priority: number;
    getRequestHandler(): RequestHandler;
}