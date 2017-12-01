import { HttpRequestParameter } from './../../parameter/http-request-parameter';
import { ParameterReader, Parameter, DefaultParameterBuilder } from 'ts-hub';
import { unmanaged } from 'inversify';
import { injectable } from 'inversify';
import { Router } from 'express';
import * as _ from "lodash";

@injectable()
export class HttpRequestParameterBuilder extends DefaultParameterBuilder<undefined, Router> {

    
    constructor(@unmanaged() parameterReader: ParameterReader) {
        super(parameterReader);
    }

    public createParameterInstance(): Parameter<undefined> {
        return new HttpRequestParameter();
    } 

    public supportsRouter(router: Router): boolean {
        return Object.getPrototypeOf(router) == Router;
    }
    

}