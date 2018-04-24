import { ErrorRequestHandler, NextFunction, Request, RequestHandler, Response, Router } from 'express';
import { injectable, unmanaged } from 'inversify';
import {
    FunctionReader,
    Middleware,
    ParameterBuilder,
    ParameterReader,
    TargetPropertyControllerActivator,
    TsHubLogger,
} from 'ts-hub';

import { FromHttpRequest } from './../builder/parameter/from-http-request';
import { HttpNamedParameterInformation } from './../information/http-named-parameter-information';
import { HttpContentTypeResponse, HttpResult } from './../response';

@injectable()
export abstract class HttpActivator<HttpRequestHandler extends RequestHandler | ErrorRequestHandler> extends TargetPropertyControllerActivator<Router, HttpRequestHandler> {

    constructor(
        @unmanaged() functionReader: FunctionReader,
        @unmanaged() paramsReader: ParameterReader,
        @unmanaged() tsHubLogger: TsHubLogger) {
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

    private isHttpReponseWriter(response: any | HttpResult): response is HttpResult {
        return response && (<HttpResult>response).writeToHttpResponse !== undefined;
    }

    protected writeResponse(result: any, request: Request, response: Response, next: NextFunction): void {
        if(!this.isHttpReponseWriter(result)) {
            result = new HttpContentTypeResponse(result);
        }
        
        result.writeToHttpResponse(request, response, next); 
    }

    protected abstract turnIntoMiddleware(action: (...args: any[]) => Promise<any> | Promise<HttpResult>): Middleware<any, HttpRequestHandler>;

}
