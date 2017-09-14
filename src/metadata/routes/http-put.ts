import { ControllerMetadataBuilder, ControllerMetadataKeys } from "ts-hub";
import { HttpPutBuilder, HttpRouteInformation } from "../../routed-controller";
import * as HttpMetadataKeys from "../http-metadata-keys";


export var HttpPut =  ControllerMetadataBuilder.instance.buildMethodLevelMetadata<HttpRouteInformation, HttpPutBuilder>(
    HttpPutBuilder, 
    [ControllerMetadataKeys.ROUTE_BUILDER, HttpMetadataKeys.HTTP_ROUTE_BUILDER]);