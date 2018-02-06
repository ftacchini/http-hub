import { HttpServer } from './http-server';
import { HttpsServer } from './https-server';
import * as https from "https";
import { Server } from "ts-hub";
import { AbstractHttpServer } from "./abstract-http-server";
import * as Cors from "cors";

const DEFAULT_HTTPS_PORT = 443;
const DEFAULT_HTTP_PORT = 8080;

export class HttpServerBuilder {

    private isHttps: boolean = false;
    private httpsCredentials: https.ServerOptions = null;
    private portNumber: number = DEFAULT_HTTP_PORT;
    private globalCors: boolean = false;
    private corsOptions: Cors.CorsOptions = null;

    private static _instance: HttpServerBuilder;
    public static get instance() {
        return this._instance || (this._instance = new HttpServerBuilder());
    }

    private constructor() {    }

    public withHttpsCredentials(credentials: https.ServerOptions): this {
        this.isHttps = true;
        this.httpsCredentials = credentials;
        this.portNumber = DEFAULT_HTTPS_PORT;

        return this;
    }

    public withPort(portNumber: number): this {
        this.portNumber = portNumber;
        return this;
    }

    public withGlobalCors(options: Cors.CorsOptions): this {
        this.globalCors = true;
        this.corsOptions = options;
        
        return this;
    }

    public buildHttpServer(): HttpServer | HttpsServer {
        
        let server: HttpServer | HttpsServer;
        
        if(this.isHttps){
            server = new HttpsServer(this.portNumber, this.httpsCredentials);
        }
        else {
            server = new HttpServer(this.portNumber);
        }

        if(this.globalCors){
            server.application.use(Cors(this.corsOptions));
        }

        this.reset();

        return server;
    }

    public reset(): void {
        this.isHttps = false;
        this.httpsCredentials = null;
        this.portNumber = DEFAULT_HTTP_PORT;
        this.globalCors = false;
        this.corsOptions = null;
    }
}