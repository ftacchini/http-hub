"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_header_parameter_1 = require("./http-header-parameter");
const http_body_parameter_1 = require("./body/http-body-parameter");
const http_query_parameter_1 = require("./http-query-parameter");
class HttpEverywhereParameter {
    getValue(request, response) {
        return HttpEverywhereParameter.paramTypes.find(paramType => this.tryParameterType(request, response, paramType));
    }
    tryParameterType(request, response, parameterType) {
        try {
            var parameter = new parameterType();
            parameter.information = this.information;
            return parameter.getValue(request, response);
        }
        catch (ex) {
            return;
        }
    }
}
HttpEverywhereParameter.paramTypes = [
    http_query_parameter_1.HttpQueryParameter,
    http_body_parameter_1.HttpBodyParameter,
    http_header_parameter_1.HttpHeaderParameter
];
exports.HttpEverywhereParameter = HttpEverywhereParameter;
//# sourceMappingURL=http-everywhere-parameter.js.map