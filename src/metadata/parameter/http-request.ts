import { ControllerMetadataBuilder, ControllerMetadataKeys } from "ts-hub";
import { HttpRequestParameterBuilder } from "../../routed-controller";
import * as HttpMetadataKeys from "../http-metadata-keys";

export const HttpRequest = ControllerMetadataBuilder.instance.buildArgumentLevelMetadata(
    HttpRequestParameterBuilder, 
    [ControllerMetadataKeys.PARAMETER_BUILDER, HttpMetadataKeys.HTTP_PARAMETER_BUILDER]);