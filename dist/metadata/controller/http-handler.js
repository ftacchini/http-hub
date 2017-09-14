"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_hub_1 = require("ts-hub");
const routed_controller_1 = require("../../routed-controller");
const HttpMetadataKeys = require("../http-metadata-keys");
exports.HttpHandler = ts_hub_1.ControllerMetadataBuilder.instance.buildControllerLevelMetadata(routed_controller_1.HttpControllerBuilder, [ts_hub_1.ControllerMetadataKeys.CONTROLLER_BUILDER, HttpMetadataKeys.HTTP_CONTROLLER_BUILDER]);
//# sourceMappingURL=http-handler.js.map