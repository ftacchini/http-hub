import { NextFunction, Response, Request } from 'express';
import { HttpResult } from "./http-result";

export class HttpContentTypeResponse implements HttpResult {

    constructor(private value: any) {}

    writeToHttpResponse(request: Request, response: Response, next: NextFunction): void {

        response.format({
            'application/json': () => {
                response.json(this.value);
            },
            'default': () => {
                response.send(this.value);
            }
        });

        next();
    }
}