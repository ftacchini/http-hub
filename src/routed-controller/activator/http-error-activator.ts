import { NextFunction, Request, Response } from 'express';
import { ErrorRequestHandler } from 'express-serve-static-core';
import { inject, injectable } from 'inversify';
import { FunctionReader, Middleware, ParameterReader, TsHubLogger, Types } from 'ts-hub';

import { HttpActivatorMiddleware } from '../middleware/http-activator-middleware';
import { HttpResult } from './../response';
import { HttpActivator } from './http-activator';

@injectable()
export class HttpErrorActivator extends HttpActivator<ErrorRequestHandler> {

    constructor(
        @inject(Types.FunctionReader) functionReader: FunctionReader,
        @inject(Types.ParamsReader) paramsReader: ParameterReader,
        @inject(Types.TsHubLogger) tsHubLogger: TsHubLogger) {
        super(functionReader, paramsReader, tsHubLogger);
    }


    protected turnIntoMiddleware(action: (...args: any[]) => Promise<any> | Promise<HttpResult>): Middleware<any, ErrorRequestHandler> {
        var requestHandler: ErrorRequestHandler = async (error: Error, request: Request, response: Response, next: NextFunction): Promise<any> => {
            
            var result: any;

            try {
                result = await action(request, response); 
                
                this.writeResponse(result, request, response, next);
            }
            catch(ex) {
                this.tsHubLogger.debug(ex);
                next(ex);
            }
        };

        return new HttpActivatorMiddleware(requestHandler);
    };

}
