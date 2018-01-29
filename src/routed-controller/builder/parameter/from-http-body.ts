import { injectable, inject } from 'inversify';
import { Parameter, ParameterReader, Types  } from 'ts-hub';
import { HttpNamedParameterInformation } from './../../information/http-named-parameter-information';
import { HttpBodyParameter, HttpBodyParameterInformation } from './../../parameter';
import { HttpNamedParameterBuilder } from "./http-named-parameter-builder";

@injectable()
export class FromHttpBody extends HttpNamedParameterBuilder<HttpBodyParameterInformation> {
    
    constructor(@inject(Types.ParamsReader) parameterReader: ParameterReader) {
        super(parameterReader);
    }

    protected createParameterInstance(): Parameter<HttpBodyParameterInformation> {
        return new HttpBodyParameter();
    }

    protected createInformationInstance(): HttpBodyParameterInformation {
        return {};
    }

}