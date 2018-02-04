import { Response, NextFunction, Request } from 'express';

export interface HttpResult {
    writeToHttpResponse(request: Request, response: Response, next: NextFunction): void;
}