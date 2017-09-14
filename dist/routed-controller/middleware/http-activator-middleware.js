"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpActivatorMiddleware {
    constructor(requestHandler) {
        this.requestHandler = requestHandler;
        this.priority = 0;
        this.information = null;
    }
    getRequestHandler() {
        return this.requestHandler;
    }
}
exports.HttpActivatorMiddleware = HttpActivatorMiddleware;
//# sourceMappingURL=http-activator-middleware.js.map