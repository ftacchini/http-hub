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
const inversify_2 = require("inversify");
const express_1 = require("express");
const ts_hub_1 = require("ts-hub");
let HttpConstructorMiddlewareBuilder = class HttpConstructorMiddlewareBuilder extends ts_hub_1.ConstructorMiddlewareBuilder {
    constructor(controllerActivator) {
        super(controllerActivator);
    }
    get priority() {
        return this.information.priority || 0;
    }
    supportsRouter(router) {
        return Object.getPrototypeOf(router) == express_1.Router;
    }
};
HttpConstructorMiddlewareBuilder = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_2.inject(ts_hub_1.Types.HttpControllerActivator)),
    __metadata("design:paramtypes", [ts_hub_1.ControllerActivator])
], HttpConstructorMiddlewareBuilder);
exports.HttpConstructorMiddlewareBuilder = HttpConstructorMiddlewareBuilder;
//# sourceMappingURL=http-constructor-middleware-builder.js.map