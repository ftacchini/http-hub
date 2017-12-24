import { Server } from "ts-hub";
import { HttpsServer } from "../../../server/https-server";
import { AbstractHttpControllerBuilder } from "./abstract-http-controller-builder";

export class HttpsControllerBuilder extends AbstractHttpControllerBuilder {

    public supportsServer(server: Server) : boolean {
        return server instanceof HttpsServer;
    }
}