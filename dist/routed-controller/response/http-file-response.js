"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpFileResponse {
    constructor(filePath, options) {
        this.filePath = filePath;
        this.options = options;
    }
    writeToHttpResponse(request, response, next) {
        response.sendFile(this.filePath, this.options, (err) => {
            if (err) {
                next(err);
            }
            else {
                next();
            }
        });
    }
}
exports.HttpFileResponse = HttpFileResponse;
//# sourceMappingURL=http-file-response.js.map