import { NextFunction, Response, Request } from 'express';
import { HttpResponse } from "./http-response";

export class HttpErrorResponse implements HttpResponse {

    constructor(
        public statusCode: number,
        public errorMessage: string) {

        }

    writeToHttpResponse(request: Request, response: Response, next: NextFunction): void {
        response.statusCode = this.statusCode;
        response.send(this.errorMessage);
    }
}