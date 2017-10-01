import { ControllerMetadataBuilder, ControllerMetadataKeys } from "ts-hub";
import { HttpHeaderParameterBuilder, HttpNamedParameterInformation } from "../../routed-controller";
import * as HttpMetadataKeys from "../http-metadata-keys";

export const FromHttpHeader = ControllerMetadataBuilder.instance.buildArgumentLevelMetadata<HttpNamedParameterInformation, HttpHeaderParameterBuilder>(
    HttpHeaderParameterBuilder, 
    [ControllerMetadataKeys.PARAMETER_BUILDER, HttpMetadataKeys.HTTP_PARAMETER_BUILDER]);