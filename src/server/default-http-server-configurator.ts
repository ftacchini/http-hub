import { HttpControllerActivator } from './../routed-controller';
import { HttpServer } from './http-server';
import { ServerConfigurator, HubContainer, Types } from 'ts-hub';

export class DefaultHttpServerConfigurator implements ServerConfigurator<HttpServer> {
    
    public configureServer(server: HttpServer, container: HubContainer): void {
        this.configureContainer(container);
    }

    protected configureContainer(container: HubContainer): void {
        this.configureActivator(container);
    }

    protected configureActivator(container: HubContainer): void{
        container.bind(Types.HttpControllerActivator).to(HttpControllerActivator);
    }
}