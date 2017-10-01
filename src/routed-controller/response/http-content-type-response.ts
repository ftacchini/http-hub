import { NextFunction, Response, Request } from 'express';
import { HttpResponse } from "./http-response";

export class HttpContentTypeResponse implements HttpResponse {

    constructor(private value: any) {}

    writeToExpressResponse(request: Request, response: Response, next: NextFunction): void {

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