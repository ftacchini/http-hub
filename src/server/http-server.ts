import * as express from "express";
import * as http from "http";
import { Server } from "ts-hub";
import { AbstractHttpServer } from "./abstract-http-server";

export class HttpServer extends AbstractHttpServer<http.Server> {

    public static bootstrap(port: number = 8080): HttpServer {
        return new HttpServer(port);
    }

    private constructor(port: number) {
        super(port);
    }

    protected createServer(application: express.Application): http.Server {
        return http.createServer(application);
    }

}