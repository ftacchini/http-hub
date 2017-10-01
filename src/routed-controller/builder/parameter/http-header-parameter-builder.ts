import { injectable, inject } from 'inversify';
import { Parameter, ParameterReader, Types  } from 'ts-hub';
import { HttpNamedParameterInformation } from './../../information/http-named-parameter-information';
import { HttpHeaderParameter } from './../../parameter';
import { HttpNamedParameterBuilder } from "./http-named-parameter-builder";

@injectable()
export class HttpHeaderParameterBuilder extends HttpNamedParameterBuilder<HttpNamedParameterInformation> {
    
    constructor(@inject(Types.ParamsReader) parameterReader: ParameterReader) {
        super(parameterReader);
    }

    protected createParameterInstance(): Parameter<HttpNamedParameterInformation> {
        return new HttpHeaderParameter();
    }

    protected createInformationInstance(): HttpNamedParameterInformation {
        return new HttpNamedParameterInformation();
    }
}