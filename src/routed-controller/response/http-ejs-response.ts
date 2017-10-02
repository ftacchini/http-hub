import { NextFunction, Response, Request } from 'express';
import { HttpResponse } from "./http-response";

export class HttpEjsResponse implements HttpResponse {

    constructor(private path: string, private data: any) {}

    writeToHttpResponse(request: Request, response: Response, next: NextFunction): void {
        response.render(this.path, this.data);
        next();
    }
}