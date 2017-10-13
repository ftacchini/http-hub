"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpJsonResponse {
    constructor(value) {
        this.value = value;
    }
    writeToHttpResponse(request, response, next) {
        response.json(this.value);
        next();
    }
}
exports.HttpJsonResponse = HttpJsonResponse;
//# sourceMappingURL=http-json-response.js.map