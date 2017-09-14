"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const ts_hub_1 = require("ts-hub");
const information_1 = require("../../information");
const http_controller_1 = require("../../http-controller");
const http_server_1 = require("../../../server/http-server");
const inversify_1 = require("inversify");
let HttpControllerBuilder = class HttpControllerBuilder extends ts_hub_1.RoutedControllerBuilder {
    constructor(middlewareReader, routeReader) {
        super(middlewareReader, routeReader);
    }
    buildController() {
        this.information || (this.information = new information_1.HttpControllerInformation());
        this.information.name || (this.information.name = this.target.constructor.name);
        return super.buildController();
    }
    supportsServer(server) {
        return server instanceof http_server_1.HttpServer;
    }
    buildRoutedController() {
        return new http_controller_1.HttpController();
    }
};
HttpControllerBuilder = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ts_hub_1.Types.MiddlewareReader)),
    __param(1, inversify_1.inject(ts_hub_1.Types.RouteReader)),
    __metadata("design:paramtypes", [Object, Object])
], HttpControllerBuilder);
exports.HttpControllerBuilder = HttpControllerBuilder;
//# sourceMappingURL=http-controller-builder.js.map