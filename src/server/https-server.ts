import * as express from "express";
import * as https from "https";
import { Server } from "ts-hub";
import { AbstractHttpServer } from "./abstract-http-server";

export class HttpsServer extends AbstractHttpServer<https.Server> {

    public static bootstrap(credentials: https.ServerOptions, port: number = 443): HttpsServer {
        return new HttpsServer(port, credentials);
    }

    private constructor(port: number, private credentials: https.ServerOptions) {
        super(port);
    }

    protected createServer(application: express.Application): https.Server {
        return https.createServer(this.credentials, application);
    }

}