import { Response, NextFunction } from 'express';

export interface HttpReponseWriter {
    writeToResponse(response: Response, next: NextFunction): void;
}