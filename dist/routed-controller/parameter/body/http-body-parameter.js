"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_hub_1 = require("ts-hub");
const BodyParser = require("body-parser");
const http_body_type_1 = require("./http-body-type");
class HttpBodyParameter {
    getValue(request, response) {
        this.information.type || (this.information.type = http_body_type_1.HttpBodyType.Json);
        var parsers = (this.information.type == http_body_type_1.HttpBodyType.Any) ?
            Array.from(HttpBodyParameter.parsersMap.values()) :
            [HttpBodyParameter.parsersMap.get(this.information.type)];
        var value = parsers.find(parserName => {
            var parser = BodyParser[parserName];
            parser(request, response, (error) => {
                if (error) {
                    throw error;
                }
            });
            return request.body && request.body[this.information.name];
        });
        return ts_hub_1.TypesHelper.instance.castToType(value, this.type);
    }
}
HttpBodyParameter.parsersMap = new Map([[http_body_type_1.HttpBodyType.Json, "json"],
    [http_body_type_1.HttpBodyType.Raw, "raw"],
    [http_body_type_1.HttpBodyType.Text, "text"],
    [http_body_type_1.HttpBodyType.Urlencoded, "urlencoded"]]);
exports.HttpBodyParameter = HttpBodyParameter;
//# sourceMappingURL=http-body-parameter.js.map