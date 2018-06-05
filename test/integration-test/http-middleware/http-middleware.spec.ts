import 'jasmine';
import 'reflect-metadata';

import { DecoratedFrameworkBuilder, MetadataControllerLoader } from 'decorated-ts-hub';
import * as Http from 'http';
import { Hub, HubBuilder, InversifyContainer } from 'ts-hub';

import { HttpRouteType, HttpServerBuilder, HttpVerb } from '../../../src';
import { OperationsRegistry, OperationsRegistryId } from '../operations-registry';
import { QuietLogger } from '../quiet-logger';
import { CONTROLLER_CALLED, MIDDLEWARE_CALLED, ERROR_MIDDLEWARE_CALLED, CONTROLLER_ERROR } from './middleware-test-constants';

var port = 8082;
var controllerLoader = new MetadataControllerLoader("dist", /(.*)http\-middleware\-controller\.js$/);

var container = new InversifyContainer();
container.bind(OperationsRegistryId).toConstantValue(new OperationsRegistry());

var httpServer = HttpServerBuilder.instance
    .withPort(port)
    .buildHttpServer();

var framework = DecoratedFrameworkBuilder.instance
    .withContollerLoader(controllerLoader)
    .buildDecoratedFramework(container);

var httpApplication: Hub = HubBuilder.instance
    .withServerSupport(httpServer)
    .withLogger(new QuietLogger())
    .withContainer(container)
    .withFramework(framework)
    .buildHub();

describe("http middleware -", () => {

    let registry: OperationsRegistry;

    beforeAll(async (done) => {
        registry = container.get(OperationsRegistryId);
        var running = await httpApplication.run();
        done();
    });

    afterEach(() => {
        registry.clean();
    })

    describe("middleware", () => {
        it("should respond when controller is called", async (done) => {
            //arrange
            //act
            var result = await performHttpCall(HttpVerb.GET, `middlewareTest`);

            //assert
            expect(registry.registry.length).toEqual(2);
            expect(registry.registry.some(x => x == CONTROLLER_CALLED));
            expect(registry.registry.some(x => x == MIDDLEWARE_CALLED));
            done();
        })
    })

    describe("error middleware", () => {
        it("should respond when error is thrown", async (done) => {
            //arrange
            //act
            var result = await performHttpCall(HttpVerb.GET, `errorMiddlewareTest`);

            //assert
            expect(registry.registry.length).toEqual(3);
            expect(registry.registry.some(x => x == CONTROLLER_CALLED));
            expect(registry.registry.some(x => x == ERROR_MIDDLEWARE_CALLED));
            expect(registry.registry.some(x => x == CONTROLLER_ERROR));
            done();
        })
    })

    

    function performHttpCall(method: HttpRouteType, endpoint: string): Promise<Http.IncomingMessage> {
        var options = {
            host: 'localhost',
            path: `/HttpMiddleware/${endpoint}`,
            port: port,
            method: method
        };
        
        return new Promise((fulfill, reject) => {
            Http.request(options)
                .on('response', fulfill)
                .end();
        });
    }

})