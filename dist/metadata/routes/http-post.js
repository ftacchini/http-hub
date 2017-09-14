"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_hub_1 = require("ts-hub");
const routed_controller_1 = require("../../routed-controller");
const HttpMetadataKeys = require("../http-metadata-keys");
exports.HttpPost = ts_hub_1.ControllerMetadataBuilder.instance.buildMethodLevelMetadata(routed_controller_1.HttpPostBuilder, [ts_hub_1.ControllerMetadataKeys.ROUTE_BUILDER, HttpMetadataKeys.HTTP_ROUTE_BUILDER]);
//# sourceMappingURL=http-post.js.map