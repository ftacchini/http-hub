import { ControllerMetadataBuilder, ControllerMetadataKeys } from "ts-hub";
import { HttpDeleteBuilder, HttpRouteInformation } from "../../routed-controller";
import * as HttpMetadataKeys from "../http-metadata-keys";


export var HttpDelete =  ControllerMetadataBuilder.instance.buildMethodLevelMetadata<HttpRouteInformation, HttpDeleteBuilder>(
    HttpDeleteBuilder, 
    [ControllerMetadataKeys.ROUTE_BUILDER, HttpMetadataKeys.HTTP_ROUTE_BUILDER]);