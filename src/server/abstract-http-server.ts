import { HttpTypes } from './../http-types';
import * as express from "express";
import { Server, HubContainer } from "ts-hub";
import { HttpControllerActivator } from '../index';

export enum HttpServerStatus {
    Running,
    Stopped,
    ErrorStarting,
    ErrorStopping,
    NotStarted
}

export abstract class AbstractHttpServer<HttpServerType extends { listen: any, close: any }> implements Server {

    protected app: express.Application;
    protected server: HttpServerType;
    protected status: HttpServerStatus;

    protected constructor(protected port: number) {
        this.app = express();
        this.status = HttpServerStatus.NotStarted;
    }

    public get application(): express.Application {
        return this.app;
    }

    protected abstract get httpServerType(): string;
    protected abstract createServer(application: express.Application): HttpServerType;

    public setupDependencies(container: HubContainer): void {
        container.bind(HttpTypes.HttpControllerActivator).to(HttpControllerActivator);   
    }

    public getStatus(): string {
        switch(this.status) {
            case HttpServerStatus.Running:
                return `${this.httpServerType} running at port ${this.port}`;
            case HttpServerStatus.Stopped:
                return `${this.httpServerType} has been stopped`;
            case HttpServerStatus.ErrorStarting:
                return `There was an error starting ${this.httpServerType} at port ${this.port}`;
            case HttpServerStatus.ErrorStopping:
                    return `There was an error stopping ${this.httpServerType} at port ${this.port}`;
            case HttpServerStatus.NotStarted: 
            default: 
                return `${this.httpServerType} has not been started`;
        }
    }

    public run(): Promise<any> {
        
        var promise = new Promise((resolve, reject) => {
            this.server = this.createServer(this.application);
            
            this.server.listen(this.port, (err: any, server: any) => {
                if(err) { 
                    this.status = HttpServerStatus.ErrorStarting;
                    reject(err);
                } else {
                    this.status = HttpServerStatus.Running;
                    resolve(server)
                }
            });
        });

        return promise;
    }

    public stop(): Promise<any> {

        var promise = new Promise((resolve, reject) => {

            if(this.server){
                this.server.close((err: any, server: any) => {
                    if(err) { 
                        this.status = HttpServerStatus.ErrorStopping;
                        reject(err);
                    } else {
                        this.status = HttpServerStatus.Stopped;
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