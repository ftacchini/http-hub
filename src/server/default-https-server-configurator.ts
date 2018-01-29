import { HttpControllerActivator } from './../routed-controller';
import { HttpsServer } from './https-server';
import { ServerConfigurator, HubContainer, Types } from 'ts-hub';

export class DefaultHttpsServerConfigurator implements ServerConfigurator<HttpsServer> {
    
    public configureServer(server: HttpsServer, container: HubContainer): void {
        this.configureContainer(container);
    }

    protected configureContainer(container: HubContainer): void {
        this.configureActivator(container);
    }

    protected configureActivator(container: HubContainer): void{
        container.bind(Types.HttpControllerActivator).to(HttpControllerActivator);
    }
}