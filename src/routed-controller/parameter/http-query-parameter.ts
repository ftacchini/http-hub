import { Response, Request } from 'express';
import { Parameter, TypesHelper } from 'ts-hub';
import { HttpNamedParameterInformation } from './../information';

export class HttpQueryParameter implements Parameter<HttpNamedParameterInformation>{
    
    public information: HttpNamedParameterInformation;
    public index: number;
    public type: any;
    
    public getValue(request: Request, response: Response) : any {
        var value = request.query[this.information.name];
        return TypesHelper.instance.castToType(value, this.type);
    }
}