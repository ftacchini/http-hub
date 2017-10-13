"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpEjsResponse {
    constructor(path, data) {
        this.path = path;
        this.data = data;
    }
    writeToHttpResponse(request, response, next) {
        response.render(this.path, this.data);
        next();
    }
}
exports.HttpEjsResponse = HttpEjsResponse;
//# sourceMappingURL=http-ejs-response.js.map