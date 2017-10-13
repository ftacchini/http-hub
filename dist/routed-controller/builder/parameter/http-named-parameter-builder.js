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
const inversify_1 = require("inversify");
const inversify_2 = require("inversify");
const express_1 = require("express");
const _ = require("lodash");
let HttpNamedParameterBuilder = class HttpNamedParameterBuilder extends ts_hub_1.ParameterBuilder {
    constructor(parameterReader) {
        super(parameterReader);
    }
    buildParam() {
        var information = this.createInformationInstance();
        this.information = (this.information && _.merge(information, this.information)) || information;
        this.information.name || (this.information.name = this.getParameterName());
        return super.buildParam();
    }
    getParameterName() {
        var names = ts_hub_1.JsHelper.instance.readFunctionParamNames(this.target[this.propertyKey]);
        return names[this.arg];
    }
    supportsRouter(router) {
        return Object.getPrototypeOf(router) == express_1.Router;
    }
};
HttpNamedParameterBuilder = __decorate([
    inversify_2.injectable(),
    __param(0, inversify_1.unmanaged()),
    __metadata("design:paramtypes", [Object])
], HttpNamedParameterBuilder);
exports.HttpNamedParameterBuilder = HttpNamedParameterBuilder;
//# sourceMappingURL=http-named-parameter-builder.js.map