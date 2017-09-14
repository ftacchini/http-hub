import { ControllerMetadataBuilder, ControllerMetadataKeys } from "ts-hub";
import { HttpPostBuilder, HttpRouteInformation } from "../../routed-controller";
import * as HttpMetadataKeys from "../http-metadata-keys";


export var HttpPost =  ControllerMetadataBuilder.instance.buildMethodLevelMetadata<HttpRouteInformation, HttpPostBuilder>(
    HttpPostBuilder, 
    [ControllerMetadataKeys.ROUTE_BUILDER, HttpMetadataKeys.HTTP_ROUTE_BUILDER]);