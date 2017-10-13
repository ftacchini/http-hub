"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpContentTypeResponse {
    constructor(value) {
        this.value = value;
    }
    writeToHttpResponse(request, response, next) {
        response.format({
            'application/json': () => {
                response.json(this.value);
            },
            'default': () => {
                response.send(this.value);
            }
        });
        next();
    }
}
exports.HttpContentTypeResponse = HttpContentTypeResponse;
//# sourceMappingURL=http-content-type-response.js.map