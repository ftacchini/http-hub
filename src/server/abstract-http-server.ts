import { HttpTypes } from './../http-types';
import * as express from "express";
import { Server, HubContainer } from "ts-hub";
import { HttpControllerActivator } from '../index';

export abstract class AbstractHttpServer<HttpServerType extends { listen: any, close: any }> implements Server {

    protected _app: express.Application;
    protected _server: HttpServerType;

    protected constructor(protected port: number) {
        this._app = express();
    }

    public get application(): express.Application {
        return this._app;
    }

    protected abstract createServer(application: express.Application): HttpServerType;

    public setupDependencies(container: HubContainer): void {
        container.bind(HttpTypes.HttpControllerActivator).to(HttpControllerActivator);   
    }

    public run(): Promise<any> {
        
        var promise = new Promise((resolve, reject) => {
            this._server = this.createServer(this.application);
            
            this._server.listen(this.port, (err: any, server: any) => {
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