import { NextFunction, Response, Request } from 'express';
import { HttpResponse } from './http-response';

export class HttpFileResponse implements HttpResponse {
    constructor(private value: any) { }

    writeToExpressResponse(request: Request, response: Response, next: NextFunction): void {
        response.sendFile()
    }
}