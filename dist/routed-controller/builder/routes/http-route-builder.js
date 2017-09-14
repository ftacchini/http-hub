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
const inversify_1 = require("inversify");
const ts_hub_1 = require("ts-hub");
const information_1 = require("../../information");
const express_1 = require("express");
const http_route_1 = require("../../http-route");
const _ = require("lodash");
require("reflect-metadata");
let HttpRouteBuilder = class HttpRouteBuilder extends ts_hub_1.RouteBuilder {
    constructor(middlewareReader, controllerActivator) {
        super(middlewareReader, controllerActivator);
    }
    supportsRouter(router) {
        return Object.getPrototypeOf(router) == express_1.Router;
    }
    buildRoute(router) {
        var information = new information_1.HttpRouteInformation();
        this.information = (this.information && _.merge(information, this.information)) || information;
        this.information.path || (this.information.path = this.propertyKey);
        this.information.type || (this.information.type = this.getDefaultRouteType());
        return super.buildRoute(router);
    }
    createRouteInstance() {
        return new http_route_1.HttpRoute();
    }
};
HttpRouteBuilder = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.unmanaged()),
    __param(1, inversify_1.unmanaged()),
    __metadata("design:paramtypes", [Object, ts_hub_1.ControllerActivator])
], HttpRouteBuilder);
exports.HttpRouteBuilder = HttpRouteBuilder;
//# sourceMappingURL=http-route-builder.js.map