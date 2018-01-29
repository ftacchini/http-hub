import { Response, Request } from 'express';
import { Parameter } from 'ts-hub';

export class HttpResponseParameter implements Parameter<undefined>{
    
    public information: undefined;
    public index: number;
    public type: any;
    
    public getValue(staticData: any, request: Request, response: Response) : any {
       return response;
    }
}