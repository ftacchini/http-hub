import { ParameterReader, JsHelper, ParameterBuilder, Parameter } from 'ts-hub';
import { unmanaged } from 'inversify';
import { HttpNamedParameterInformation } from './../../information/http-named-parameter-information';
import { injectable } from 'inversify';
import { Router } from 'express';
import * as _ from "lodash";

@injectable()
export abstract class HttpNamedParameterBuilder<Information extends HttpNamedParameterInformation> extends ParameterBuilder<Information, Router> {

    
    constructor(@unmanaged() parameterReader: ParameterReader) {
        super(parameterReader);
    }

    protected abstract createParameterInstance(): Parameter<Information>;
    protected abstract createInformationInstance(): Information;

    public buildParam(): Parameter<Information> {
        var information = this.createInformationInstance();
        this.information = (this.information &&  _.merge(information, this.information)) || information;
        this.information.name || (this.information.name = this.getParameterName());
        
        return super.buildParam();
    } 

    private getParameterName() : string {
        var names = JsHelper.instance.readFunctionParamNames(this.target[this.propertyKey]);
        return names[this.arg];
    }

    public supportsRouter(router: Router): boolean {
        return Object.getPrototypeOf(router) == Router;
    }
    

}