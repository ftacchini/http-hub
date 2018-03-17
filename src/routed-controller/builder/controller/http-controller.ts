import { Server } from "ts-hub";
import { HttpServer } from "../../../server/http-server";
import { AbstractHttpControllerBuilder } from "./abstract-http-controller-builder";
import { injectable } from "inversify";

@injectable()
export class HttpController extends AbstractHttpControllerBuilder {

    public supportsServer(server: Server) : boolean {
        return server instanceof HttpServer;
    }
}