import { HubBuilder } from "ts-hub";
import { HttpServer, DefaultHttpServerConfigurator } from "../src";
import { Container, inject, injectable, unmanaged } from "inversify";

var httpServer = HttpServer.bootstrap();

var hub = HubBuilder.instance
    .setServerSupport(httpServer, new DefaultHttpServerConfigurator())
    .buildHub();

hub.run();