import * as express from "express";
import * as http from "http";
import { Server } from "ts-hub";
import { AbstractHttpServer } from "./abstract-http-server";

export class HttpServer extends AbstractHttpServer<http.Server> {

    public constructor(port: number) {
        super(port);
    }

    protected createServer(application: express.Application): http.Server {
        return http.createServer(application);
    }

}