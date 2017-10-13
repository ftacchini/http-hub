"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_hub_1 = require("ts-hub");
class HttpHeaderParameter {
    getValue(request, response) {
        var value = request.header(this.information.name);
        return ts_hub_1.TypesHelper.instance.castToType(value, this.type);
    }
}
exports.HttpHeaderParameter = HttpHeaderParameter;
//# sourceMappingURL=http-header-parameter.js.map