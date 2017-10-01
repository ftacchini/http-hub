import { Response, NextFunction, Request } from 'express';

export interface HttpResponse {
    writeToExpressResponse(request: Request, response: Response, next: NextFunction): void;
}