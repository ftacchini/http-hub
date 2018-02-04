import { NextFunction, Response, Request } from 'express';
import { HttpResult } from "./http-result";

export class HttpEjsResponse implements HttpResult {

    constructor(private path: string, private data: any) {}

    writeToHttpResponse(request: Request, response: Response, next: NextFunction): void {
        response.render(this.path, this.data);
        next();
    }
}