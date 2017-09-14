import { ControllerMetadataBuilder, ControllerMetadataKeys } from "ts-hub";
import { HttpHeadBuilder, HttpRouteInformation } from "../../routed-controller";
import * as HttpMetadataKeys from "../http-metadata-keys";


export var HttpHead =  ControllerMetadataBuilder.instance.buildMethodLevelMetadata<HttpRouteInformation, HttpHeadBuilder>(
    HttpHeadBuilder, 
    [ControllerMetadataKeys.ROUTE_BUILDER, HttpMetadataKeys.HTTP_ROUTE_BUILDER]);