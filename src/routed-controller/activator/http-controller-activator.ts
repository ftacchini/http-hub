import { HttpResponseWriter, HttpContentTypeResponseWriter } from './../response';
import { HttpNamedParameterInformation } from './../information/http-named-parameter-information';
import { HttpEverywhereParameterBuilder } from './../builder/parameter/http-everywhere-parameter-builder';
import { HttpActivatorMiddleware } from '../middleware/http-activator-middleware';
import { inject, injectable } from 'inversify';
import { RequestHandler, Request, Response, Router, NextFunction } from 'express';
import { ControllerActivator, ParameterBuilder, Middleware, FunctionReader, ParameterReader, Types } from "ts-hub";
import * as _ from "lodash";

@injectable()
export class HttpControllerActivator extends ControllerActivator<Router, RequestHandler> {

    constructor(
        @inject(Types.FunctionReader) functionReader: FunctionReader,
        @inject(Types.ParamsReader) paramsReader: ParameterReader) {
        super(functionReader, paramsReader);
    }


    protected createDefaultParameterBuilder(target: any, propertyKey: string, name: string, index: number): ParameterBuilder<any, Router> {
        var builder = new HttpEverywhereParameterBuilder(this.paramsReader);
        builder.arg = index;
        builder.information = new HttpNamedParameterInformation();
        builder.information.name = name;
        builder.target = target;
        builder.propertyKey = propertyKey;

        return builder;
    }

    private isHttpReponseWriter(response: any | HttpResponseWriter): response is HttpResponseWriter {
        return (<HttpResponseWriter>response).writeToResponse !== undefined;
    }

    protected turnIntoMiddleware(action: (...args: any[]) => any | HttpResponseWriter): Middleware<any, RequestHandler> {
        var requestHandler: RequestHandler = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
            
            try {
                var result = await action(request, response); 

                if(!this.isHttpReponseWriter(result)) {
                    result = new HttpContentTypeResponseWriter(result);
                } 

                result.writeToResponse(request, response, next);
            }
            catch(ex) {
                next(ex);
            }

            next();
        };

        return new HttpActivatorMiddleware(requestHandler);
    };

}
