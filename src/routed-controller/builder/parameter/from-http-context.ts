import { HttpSpecialDataParameter } from './../../parameter/http-special-data-parameter';
import { injectable, inject } from 'inversify';
import { Parameter, ParameterReader, Types  } from 'ts-hub';
import { HttpNamedParameterInformation } from './../../information/http-named-parameter-information';
import { HttpQueryParameter } from './../../parameter';
import { HttpNamedParameterBuilder } from "./http-named-parameter-builder";

@injectable()
export class FromHttpContext extends HttpNamedParameterBuilder<HttpNamedParameterInformation> {
    
    constructor(@inject(Types.ParamsReader) parameterReader: ParameterReader) {
        super(parameterReader);
    }

    protected createParameterInstance(): Parameter<HttpNamedParameterInformation> {
        return new HttpSpecialDataParameter();
    }

    protected createInformationInstance(): HttpNamedParameterInformation {
        return {};
    }
}