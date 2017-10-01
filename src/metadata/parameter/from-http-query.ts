import { ControllerMetadataBuilder, ControllerMetadataKeys } from "ts-hub";
import { HttpQueryParameterBuilder, HttpNamedParameterInformation } from "../../routed-controller";
import * as HttpMetadataKeys from "../http-metadata-keys";

export const FromHttpQuery = ControllerMetadataBuilder.instance.buildArgumentLevelMetadata<HttpNamedParameterInformation, HttpQueryParameterBuilder>(
    HttpQueryParameterBuilder, 
    [ControllerMetadataKeys.PARAMETER_BUILDER, HttpMetadataKeys.HTTP_PARAMETER_BUILDER]);