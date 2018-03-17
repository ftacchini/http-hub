import { Server } from "ts-hub";
import { HttpsServer } from "../../../server/https-server";
import { AbstractHttpControllerBuilder } from "./abstract-http-controller-builder";
import { injectable } from "inversify";

@injectable()
export class HttpsController extends AbstractHttpControllerBuilder {

    public supportsServer(server: Server) : boolean {
        return server instanceof HttpsServer;
    }
}