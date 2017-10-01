import { HttpBodyParameterInformation } from './../../routed-controller/parameter';
import { ControllerMetadataBuilder, ControllerMetadataKeys } from "ts-hub";
import { HttpBodyParameterBuilder } from "../../routed-controller";
import * as HttpMetadataKeys from "../http-metadata-keys";

export const FromHttpBody = ControllerMetadataBuilder.instance.buildArgumentLevelMetadata<HttpBodyParameterInformation, HttpBodyParameterBuilder>(
    HttpBodyParameterBuilder, 
    [ControllerMetadataKeys.PARAMETER_BUILDER, HttpMetadataKeys.HTTP_PARAMETER_BUILDER]);