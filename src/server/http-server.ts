import * as express from "express";
import * as http from "http";
import { Server } from "ts-hub";

export class HttpServer implements Server {

    private _app: express.Application;
    private _server: http.Server;

    public static bootstrap(port: number = 8080): HttpServer {
        return new HttpServer(port);
    }

    private constructor(private port: number) {
        this._app = express();
    }

    public get application(): express.Application{
        return this._app;
    }

    public run(): Promise<any> {
        var promise = new Promise((resolve, reject) => {
            this._server = this.application.listen(this.port, (err: any, server: any) => {
                if(err) { 
                    reject(err);
                } else {
                    resolve(server)
                }
            });
        });

        return promise;
    }

    public stop(): Promise<any> {

        var promise = new Promise((resolve, reject) => {

            if(this._server){
                this._server.close((err: any, server: any) => {
                    if(err) { 
                        reject(err);
                    } else {
                        resolve(server)
                    }
                });
            }
            else {
                resolve();
            }
        });

        return promise;
    }

}