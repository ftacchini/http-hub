import { NextFunction, Response, Request } from 'express';
import { HttpResult } from './http-result';

export class HttpFileResponse implements HttpResult {
    constructor(private filePath: string, private options?: any) { }

    writeToHttpResponse(request: Request, response: Response, next: NextFunction): void {
        response.sendFile(this.filePath, this.options, (err) => {
            if(err) {
                next(err);
            }
            else{
                next();
            }
        });

    }
}