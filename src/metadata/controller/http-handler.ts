import { ControllerMetadataBuilder, ControllerMetadataKeys } from "ts-hub";
import { HttpControllerBuilder, HttpControllerInformation } from "../../routed-controller";
import * as HttpMetadataKeys from "../http-metadata-keys";

export const HttpHandler = ControllerMetadataBuilder.instance.buildControllerLevelMetadata<HttpControllerInformation, HttpControllerBuilder>(
    HttpControllerBuilder, 
    [ControllerMetadataKeys.CONTROLLER_BUILDER, HttpMetadataKeys.HTTP_CONTROLLER_BUILDER]);