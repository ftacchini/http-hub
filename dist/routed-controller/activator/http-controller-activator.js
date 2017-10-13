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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = require("./../response");
const http_named_parameter_information_1 = require("./../information/http-named-parameter-information");
const http_everywhere_parameter_builder_1 = require("./../builder/parameter/http-everywhere-parameter-builder");
const http_activator_middleware_1 = require("../middleware/http-activator-middleware");
const inversify_1 = require("inversify");
const ts_hub_1 = require("ts-hub");
let HttpControllerActivator = class HttpControllerActivator extends ts_hub_1.ControllerActivator {
    constructor(functionReader, paramsReader) {
        super(functionReader, paramsReader);
    }
    createDefaultParameterBuilder(target, propertyKey, name, index) {
        var builder = new http_everywhere_parameter_builder_1.HttpEverywhereParameterBuilder(this.paramsReader);
        builder.arg = index;
        builder.information = new http_named_parameter_information_1.HttpNamedParameterInformation();
        builder.information.name = name;
        builder.target = target;
        builder.propertyKey = propertyKey;
        return builder;
    }
    isHttpReponseWriter(response) {
        return response.writeToHttpResponse !== undefined;
    }
    turnIntoMiddleware(action) {
        var requestHandler = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                var result = yield action(request, response);
                if (!this.isHttpReponseWriter(result)) {
                    result = new response_1.HttpContentTypeResponse(result);
                }
                result.writeToHttpResponse(request, response, next);
            }
            catch (ex) {
                next(ex);
            }
            next();
        });
        return new http_activator_middleware_1.HttpActivatorMiddleware(requestHandler);
    }
    ;
};
HttpControllerActivator = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ts_hub_1.Types.FunctionReader)),
    __param(1, inversify_1.inject(ts_hub_1.Types.ParamsReader)),
    __metadata("design:paramtypes", [Object, Object])
], HttpControllerActivator);
exports.HttpControllerActivator = HttpControllerActivator;
//# sourceMappingURL=http-controller-activator.js.map