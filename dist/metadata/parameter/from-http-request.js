"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_hub_1 = require("ts-hub");
const routed_controller_1 = require("../../routed-controller");
const HttpMetadataKeys = require("../http-metadata-keys");
exports.FromHttpRequest = ts_hub_1.ControllerMetadataBuilder.instance.buildArgumentLevelMetadata(routed_controller_1.HttpEverywhereParameterBuilder, [ts_hub_1.ControllerMetadataKeys.PARAMETER_BUILDER, HttpMetadataKeys.HTTP_PARAMETER_BUILDER]);
//# sourceMappingURL=from-http-request.js.map