import { ControllerMetadataBuilder, ControllerMetadataKeys } from "ts-hub";
import { HttpEverywhereParameterBuilder, HttpNamedParameterInformation } from "../../routed-controller";
import * as HttpMetadataKeys from "../http-metadata-keys";

export const FromHttpRequest = ControllerMetadataBuilder.instance.buildArgumentLevelMetadata<HttpNamedParameterInformation, HttpEverywhereParameterBuilder>(
    HttpEverywhereParameterBuilder, 
    [ControllerMetadataKeys.PARAMETER_BUILDER, HttpMetadataKeys.HTTP_PARAMETER_BUILDER]);