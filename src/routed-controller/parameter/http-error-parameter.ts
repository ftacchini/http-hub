import { Request, Response } from "express";
import { Parameter } from "ts-hub";

export class HttpErrorParameter implements Parameter<undefined>{

    public information: undefined;
    public index: number;
    public type: any;
    
    public getValue(staticData: any, error: Error, request: Request, response: Response) : any {
       return error;
    }

}