import { Response, Request } from 'express';
import { Parameter } from 'ts-hub';
import { HttpNamedParameterInformation } from './../information';

export class HttpSpecialDataParameter implements Parameter<HttpNamedParameterInformation>{
    
    public information: HttpNamedParameterInformation;
    public index: number;
    public type: any;

    
    public getValue(staticData: any, request: Request, response: Response) : any {
       return (<any>request).specialData && (<any>request).specialData[this.information.name];
    }
}