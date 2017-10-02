import { NextFunction, Response, Request } from 'express';
import { HttpResponse } from "./http-response";

export class HttpStreamResponse implements HttpResponse {

    constructor(private stream: NodeJS.WritableStream, private options?: { end: boolean }) {}

    writeToHttpResponse(request: Request, response: Response, next: NextFunction): void {
        response.pipe(this.stream, this.options);
        this.options && this.options.end && next();
    }
}