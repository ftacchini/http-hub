import { HttpResponse, HttpContentTypeResponse } from './../response';
import { HttpNamedParameterInformation } from './../information/http-named-parameter-information';
import { FromHttpRequest } from './../builder/parameter/from-http-request';
import { HttpActivatorMiddleware } from '../middleware/http-activator-middleware';
import { inject, injectable } from 'inversify';
import { RequestHandler, Request, Response, Router, NextFunction } from 'express';
import { ClassMethodControllerActivator, ParameterBuilder, Middleware, FunctionReader, ParameterReader, Types, TsHubLogger } from "ts-hub";
import * as _ from "lodash";
import { HttpErrorResponse } from '../response/http-error-response';

@injectable()
export class HttpControllerActivator extends ClassMethodControllerActivator<Router, RequestHandler> {

    constructor(
        @inject(Types.FunctionReader) functionReader: FunctionReader,
        @inject(Types.ParamsReader) paramsReader: ParameterReader,
        @inject(Types.TsHubLogger) tsHubLogger: TsHubLogger) {
        super(functionReader, paramsReader, tsHubLogger);
    }


    protected createDefaultParameterBuilder(target: any, propertyKey: string, name: string, index: number): ParameterBuilder<any, Router> {
        var builder = new FromHttpRequest(this.paramsReader);
        var information : HttpNamedParameterInformation = {};
        information.name = name;

        return builder.withArgumentIndex(index)
                      .withInformation(information)
                      .withTarget(target)
                      .withPropertyKey(propertyKey);
    }

    private isHttpReponseWriter(response: any | HttpResponse): response is HttpResponse {
        return response && (<HttpResponse>response).writeToHttpResponse !== undefined;
    }

    protected turnIntoMiddleware(action: (...args: any[]) => any | HttpResponse): Middleware<any, RequestHandler> {
        var requestHandler: RequestHandler = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
            
            var result: any;

            try {
                result = await action(request, response); 
                
                if(!this.isHttpReponseWriter(result)) {
                    result = new HttpContentTypeResponse(result);
                } 
            }
            catch(ex) {
                result = new HttpErrorResponse(400, ex);
            }

            result.writeToHttpResponse(request, response, next);
        };

        return new HttpActivatorMiddleware(requestHandler);
    };

}
