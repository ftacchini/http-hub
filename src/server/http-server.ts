import * as express from "express";
import { Server } from "ts-hub";

export class HttpServer implements Server {

    private _app: express.Application;

    public static bootstrap(port: number = 8080): HttpServer {
        return new HttpServer(port);
    }

    private constructor(private port: number) {
        this._app = express();
    }

    public get application(): express.Application{
        return this._app;
    }

    public run(): void {
        this.application.listen(this.port);
    }

}