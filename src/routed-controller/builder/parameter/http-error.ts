import { Router } from 'express';
import { injectable, unmanaged } from 'inversify';
import { DefaultParameterBuilder, Parameter, ParameterReader } from 'ts-hub';
import { HttpErrorParameter } from '../../parameter/http-error-parameter';

@injectable()
export class HttpError extends DefaultParameterBuilder<undefined, Router> {

    
    constructor(@unmanaged() parameterReader: ParameterReader) {
        super(parameterReader);
    }

    public createParameterInstance(): Parameter<undefined> {
        return new HttpErrorParameter();
    } 

    public supportsRouter(router: Router): boolean {
        return Object.getPrototypeOf(router) == Router;
    }
    

}