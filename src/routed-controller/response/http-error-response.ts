import { NextFunction, Response, Request } from 'express';
import { HttpResult } from "./http-result";

export class HttpErrorResponse implements HttpResult {

    constructor(
        public statusCode: number,
        public errorMessage: string) {

        }

    writeToHttpResponse(request: Request, response: Response, next: NextFunction): void {
        response.statusCode = this.statusCode;
        response.send(this.errorMessage);
    }
}