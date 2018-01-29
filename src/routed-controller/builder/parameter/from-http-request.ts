import { injectable, inject } from 'inversify';
import { Parameter, ParameterReader, Types  } from 'ts-hub';
import { HttpNamedParameterInformation } from './../../information/http-named-parameter-information';
import { HttpEverywhereParameter } from './../../parameter/http-everywhere-parameter';
import { HttpNamedParameterBuilder } from "./http-named-parameter-builder";

@injectable()
export class FromHttpRequest extends HttpNamedParameterBuilder<HttpNamedParameterInformation> {
    
    constructor(@inject(Types.ParamsReader) parameterReader: ParameterReader) {
        super(parameterReader);
    }

    protected createParameterInstance(): Parameter<HttpNamedParameterInformation> {
        return new HttpEverywhereParameter();
    }

    protected createInformationInstance(): HttpNamedParameterInformation {
        return new HttpNamedParameterInformation();
    }

}