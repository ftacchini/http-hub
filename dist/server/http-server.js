"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
class HttpServer {
    constructor(port) {
        this.port = port;
        this._app = express();
    }
    static bootstrap(port = 8080) {
        return new HttpServer(port);
    }
    get application() {
        return this._app;
    }
    run() {
        this.application.listen(this.port);
    }
}
exports.HttpServer = HttpServer;
//# sourceMappingURL=http-server.js.map