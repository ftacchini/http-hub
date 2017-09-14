"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_hub_1 = require("ts-hub");
class HttpEverywhereParameter {
    getValue(request, response) {
        var value = request.query[this.information.name];
        return ts_hub_1.TypesHelper.instance.castToType(value, this.type);
    }
}
exports.HttpEverywhereParameter = HttpEverywhereParameter;
//# sourceMappingURL=http-everywhere-parameter.js.map