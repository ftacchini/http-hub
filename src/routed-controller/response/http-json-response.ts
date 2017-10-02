import { NextFunction, Response, Request } from 'express';
import { HttpResponse } from "./http-response";

export class HttpJsonResponse implements HttpResponse {

    constructor(private value: any) {}

    writeToHttpResponse(request: Request, response: Response, next: NextFunction): void {
        response.json(this.value);
        next();
    }
}