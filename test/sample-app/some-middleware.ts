import { CastParameterTypes, ControllerMiddlewareMetadataBuilder, Handler } from 'ts-hub';
import { injectable } from 'inversify';
import { HttpConstructorMiddlewareBuilder } from '../../src';
import "reflect-metadata";

class MiddlewareInfo {
    middlewareConfig: number;
}

@injectable()
export class SomeMiddleware implements Handler<MiddlewareInfo> {
    
    @CastParameterTypes()
    public handleRequest(info: MiddlewareInfo, extraParam: string): any {
        console.log("middlewareBeingCalled");
    }
}

export const MiddlewareHandler = ControllerMiddlewareMetadataBuilder
                                    .instance
                                    .buildServerSpecificMiddleware<MiddlewareInfo>(HttpConstructorMiddlewareBuilder, SomeMiddleware);