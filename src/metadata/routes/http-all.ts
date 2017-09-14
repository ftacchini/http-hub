import { ControllerMetadataBuilder, ControllerMetadataKeys } from "ts-hub";
import { HttpAllBuilder, HttpRouteInformation } from "../../routed-controller";
import * as HttpMetadataKeys from "../http-metadata-keys";


export var HttpAll =  ControllerMetadataBuilder.instance.buildMethodLevelMetadata<HttpRouteInformation, HttpAllBuilder>(
    HttpAllBuilder, 
    [ControllerMetadataKeys.ROUTE_BUILDER, HttpMetadataKeys.HTTP_ROUTE_BUILDER]);