import { HttpTypes } from './../http-types';
import * as express from "express";
import { Server, HubContainer } from "ts-hub";
import { HttpControllerActivator, HttpErrorActivator } from '../index';
import * as http from "http";
import * as https from "https";

export enum HttpServerStatus {
    Running,
    Stopped,
    ErrorStarting,
    ErrorStopping,
    NotStarted
}

export abstract class AbstractHttpServer<HttpServerType extends https.Server | http.Server> implements Server {

    protected _app: express.Application;
    protected _server: https.Server | http.Server;
    protected _status: HttpServerStatus;

    protected constructor(protected port: number) {
        this._app = express();
        this._status = HttpServerStatus.NotStarted;
    }

    public get application(): express.Application {
        return this._app;
    }

    public get server(): https.Server | http.Server {
        return this._server;
    }

    protected abstract get httpServerType(): string;
    protected abstract createServer(application: express.Application): https.Server | http.Server;

    public setupDependencies(container: HubContainer): void {
        container.bind(HttpTypes.HttpControllerActivator).to(HttpControllerActivator);   
        container.bind(HttpTypes.HttpErrorActivator).to(HttpErrorActivator);  
    }

    public getStatus(): string {
        switch(this._status) {
            case HttpServerStatus.Running:
                return `${this.httpServerType} server running at port ${this.port}`;
            case HttpServerStatus.Stopped:
                return `${this.httpServerType} server has been stopped`;
            case HttpServerStatus.ErrorStarting:
                return `There was an error starting ${this.httpServerType} server at port ${this.port}`;
            case HttpServerStatus.ErrorStopping:
                    return `There was an error stopping ${this.httpServerType} server at port ${this.port}`;
            case HttpServerStatus.NotStarted: 
            default: 
                return `${this.httpServerType} server has not been started`;
        }
    }

    public run(): Promise<any> {
        
        var promise = new Promise((resolve, reject) => {
            this._server = this.createServer(this.application);
            
            this._server.listen(this.port, (err: any, server: any) => {
                if(err) { 
                    this._status = HttpServerStatus.ErrorStarting;
                    reject(err);
                } else {
                    this._status = HttpServerStatus.Running;
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
                        this._status = HttpServerStatus.ErrorStopping;
                        reject(err);
                    } else {
                        this._status = HttpServerStatus.Stopped;
                        resolve(server);
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