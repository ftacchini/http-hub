import { NextFunction, Response, Request } from 'express';
import { HttpResult } from "./http-result";
import * as _ from "lodash";

export class HttpNextResponse implements HttpResult {

    constructor(private specialData: Object) {}

    writeToHttpResponse(request: Request, response: Response, next: NextFunction): void {

        if(this.specialData) {
            _.assign((<any>request).specialData, this.specialData);
        }

        next();
    }
}