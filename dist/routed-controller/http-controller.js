"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class HttpController {
    constructor() {
        this.router = express_1.Router();
    }
    attachToServer(server) {
        var handlers = this.middleware
            .map(middleware => middleware.getRequestHandler());
        handlers.length && this.router.use(handlers);
        this.routes.forEach(route => route.attachToServer(this.router));
        server.application.use(`/${this.information.name}`, this.router);
        return this.router;
    }
}
exports.HttpController = HttpController;
//# sourceMappingURL=http-controller.js.map