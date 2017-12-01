import { HttpResponseParameter } from './../../parameter/http-response-parameter';
import { ParameterReader, Parameter, DefaultParameterBuilder } from 'ts-hub';
import { unmanaged } from 'inversify';
import { injectable } from 'inversify';
import { Router } from 'express';
import * as _ from "lodash";

@injectable()
export class HttpResponseParameterBuilder extends DefaultParameterBuilder<undefined, Router> {

    
    constructor(@unmanaged() parameterReader: ParameterReader) {
        super(parameterReader);
    }

    public createParameterInstance(): Parameter<undefined> {
        return new HttpResponseParameter();
    } 

    public supportsRouter(router: Router): boolean {
        return Object.getPrototypeOf(router) == Router;
    }
    

}