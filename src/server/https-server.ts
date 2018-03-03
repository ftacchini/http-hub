import * as express from "express";
import * as https from "https";
import { Server } from "ts-hub";
import { AbstractHttpServer } from "./abstract-http-server";

const HTTPS: string = "https";

export class HttpsServer extends AbstractHttpServer<https.Server> {

    public constructor(port: number, private credentials: https.ServerOptions) {
        super(port);
    }

    protected createServer(application: express.Application): https.Server {
        return https.createServer(this.credentials, application);
    }

    protected get httpServerType(): string {
        return HTTPS;
    }
}