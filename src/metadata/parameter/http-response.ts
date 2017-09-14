import { ControllerMetadataBuilder, ControllerMetadataKeys } from "ts-hub";
import { HttpResponseParameterBuilder } from "../../routed-controller";
import * as HttpMetadataKeys from "../http-metadata-keys";

export const HttpResponse = ControllerMetadataBuilder.instance.buildArgumentLevelMetadata(
    HttpResponseParameterBuilder, 
    [ControllerMetadataKeys.PARAMETER_BUILDER, HttpMetadataKeys.HTTP_PARAMETER_BUILDER]);