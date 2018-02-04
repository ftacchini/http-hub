import { NextFunction, Response, Request } from 'express';
import { HttpResult } from "./http-result";

export class HttpJsonResponse implements HttpResult {

    constructor(private value: any) {}

    writeToHttpResponse(request: Request, response: Response, next: NextFunction): void {
        response.json(this.value);
        next();
    }
}