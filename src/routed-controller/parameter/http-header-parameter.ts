import { HttpNamedParameterInformation } from './../information';
import { Response, Request } from 'express';
import { Parameter, TypesHelper } from 'ts-hub';

export class HttpHeaderParameter implements Parameter<HttpNamedParameterInformation>{
    
    public information: HttpNamedParameterInformation;
    public index: number;
    public type: any;
    public getValue(staticData: any, request: Request, response: Response) : any {
        var value = request.header(this.information.name);
        return TypesHelper.instance.castToType(value, this.type);
    }

}