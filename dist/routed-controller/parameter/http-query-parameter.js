"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_hub_1 = require("ts-hub");
class HttpQueryParameter {
    getValue(request, response) {
        var value = request.query[this.information.name];
        return ts_hub_1.TypesHelper.instance.castToType(value, this.type);
    }
}
exports.HttpQueryParameter = HttpQueryParameter;
//# sourceMappingURL=http-query-parameter.js.map