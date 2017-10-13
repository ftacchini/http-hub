"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpStreamResponse {
    constructor(stream, options) {
        this.stream = stream;
        this.options = options;
    }
    writeToHttpResponse(request, response, next) {
        response.pipe(this.stream, this.options);
        this.options && this.options.end && next();
    }
}
exports.HttpStreamResponse = HttpStreamResponse;
//# sourceMappingURL=http-stream-response.js.map