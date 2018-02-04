import { NextFunction, Response, Request } from 'express';
import { HttpResult } from "./http-result";

export class HttpStreamResponse implements HttpResult {

    constructor(private stream: NodeJS.WritableStream, private options?: { end: boolean }) {}

    writeToHttpResponse(request: Request, response: Response, next: NextFunction): void {
        response.pipe(this.stream, this.options);
        this.options && this.options.end && next();
    }
}