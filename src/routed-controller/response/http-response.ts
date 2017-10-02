import { Response, NextFunction, Request } from 'express';

export interface HttpResponse {
    writeToHttpResponse(request: Request, response: Response, next: NextFunction): void;
}