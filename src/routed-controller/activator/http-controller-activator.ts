import { NextFunction, Request, RequestHandler, Response } from 'express';
import { inject, injectable } from 'inversify';
import { ActivationContextProvider, Middleware, ParameterReader, TsHubLogger, Types } from 'ts-hub';

import { HttpActivatorMiddleware } from '../middleware/http-activator-middleware';
import { HttpResult } from './../response';
import { HttpActivator } from './http-activator';

@injectable()
export class HttpControllerActivator extends HttpActivator<RequestHandler> {

    constructor(
        @inject(Types.ActivationContextProvider) activationContextProvider: ActivationContextProvider,
        @inject(Types.ParamsReader) paramsReader: ParameterReader,
        @inject(Types.TsHubLogger) tsHubLogger: TsHubLogger) {
        super(activationContextProvider, paramsReader, tsHubLogger);
    }


    protected turnIntoMiddleware(action: (...args: any[]) => Promise<any> | Promise<HttpResult>): Middleware<any, RequestHandler> {
        var requestHandler: RequestHandler = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
            
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
