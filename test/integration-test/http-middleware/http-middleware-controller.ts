import { BeforeExecution, Controller, Middleware, Route, AfterExecution, Parameter } from 'decorated-ts-hub';
import { inject } from 'inversify';

import { HttpAll, HttpController, HttpMiddleware, HttpErrorMiddleware, HttpError } from '../../../src';
import { OperationsRegistry, OperationsRegistryId } from '../operations-registry';
import { MIDDLEWARE_CALLED, CONTROLLER_CALLED, ERROR_MIDDLEWARE_CALLED, CONTROLLER_ERROR } from './middleware-test-constants';

const REGISTER_CALL: keyof RegisterCall = "registerCall";

@Middleware(HttpMiddleware, REGISTER_CALL)
export class RegisterCall {

    constructor(
        @inject(OperationsRegistryId) private operationsRegistry: OperationsRegistry) {
    }

    public registerCall(): void {
        this.operationsRegistry.register(MIDDLEWARE_CALLED);
    }

}


@Middleware(HttpErrorMiddleware, REGISTER_CALL)
export class RegisterErrorCall {

    constructor(
        @inject(OperationsRegistryId) private operationsRegistry: OperationsRegistry) {
    }

    public registerCall(@Parameter(HttpError) error: any): void {
        this.operationsRegistry.register(ERROR_MIDDLEWARE_CALLED);
        this.operationsRegistry.register(error);
    }

}

@Controller(HttpController)
export class HttpMiddlewareController {

    constructor(
        @inject(OperationsRegistryId) private operationsRegistry: OperationsRegistry) {
    }

    @BeforeExecution(RegisterCall)
    @Route(HttpAll)
    public middlewareTest(): void {
        this.operationsRegistry.register(CONTROLLER_CALLED);
    }

    @AfterExecution(RegisterErrorCall)
    @Route(HttpAll)
    public errorMiddlewareTest(): void {
        this.operationsRegistry.register(CONTROLLER_CALLED);
        throw CONTROLLER_ERROR;
    }

}