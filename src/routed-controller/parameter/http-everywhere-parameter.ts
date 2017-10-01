import { HttpHeaderParameter } from './http-header-parameter';
import { HttpBodyParameter } from './body/http-body-parameter';
import { HttpQueryParameter } from './http-query-parameter';
import { Response, Request } from 'express';
import { Parameter, TypesHelper } from 'ts-hub';
import { HttpNamedParameterInformation } from './../information';

export class HttpEverywhereParameter implements Parameter<HttpNamedParameterInformation>{
    
    public information: HttpNamedParameterInformation;
    public index: number;
    public type: any;
    

    private static paramTypes: (new (...args: any[]) => Parameter<any>)[] = [
        HttpQueryParameter,
        HttpBodyParameter,
        HttpHeaderParameter
    ];
    
    public getValue(request: Request, response: Response) : any {
        return HttpEverywhereParameter.paramTypes.find(paramType => this.tryParameterType(request, response, paramType));
    }

    private tryParameterType(request: Request, response: Response, parameterType: new (...args: any[]) => Parameter<any>): any {
        try {
            var parameter = new parameterType();
            parameter.information = this.information;

            return parameter.getValue(request, response);
        }
        catch(ex){
            return;
        }
    }
}