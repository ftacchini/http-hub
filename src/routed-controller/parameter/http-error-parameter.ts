import { Request, Response } from "express";
import { Parameter } from "ts-hub";

export class HttpErrorParameter implements Parameter<undefined>{

    public information: undefined;
    public index: number;
    public type: any;
    
    public getValue(staticData: any, request: Request, response: Response, error: Error) : any {
       return error;
    }

}