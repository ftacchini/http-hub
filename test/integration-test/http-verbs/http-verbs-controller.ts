import 'reflect-metadata';

import { Controller, Parameter, Route } from 'decorated-ts-hub';
import { Request } from 'express';
import { inject } from 'inversify';

import {
    HttpAll,
    HttpController,
    HttpDelete,
    HttpGet,
    HttpHead,
    HttpPatch,
    HttpPost,
    HttpPut,
    HttpRequest,
    HttpVerb,
} from '../../../src';
import { OperationsRegistry, OperationsRegistryId } from '../operations-registry';

    
@Controller(HttpController)
export class HttpVerbsController {

    constructor(
        @inject(OperationsRegistryId) private operationsRegistry: OperationsRegistry) { }


    @Route(HttpAll)
    public allFoo(@Parameter(HttpRequest) request: Request) {
        this.operationsRegistry.register(request.method.toLowerCase());
    }
    
    @Route(HttpAll, {
        path: "allFooWithName"
    })
    public alFoo2( @Parameter(HttpRequest) request: Request) {
        this.allFoo(request);
    }

    @Route(HttpDelete)
    public deleteFoo() {
        this.operationsRegistry.register(HttpVerb.DELETE);
    }

    @Route(HttpDelete, {
        path: "deleteFooWithName"
    })
    public deleteFoo2() {
        this.deleteFoo();
    }

    
    @Route(HttpPost)
    public postFoo() {
        this.operationsRegistry.register(HttpVerb.POST);
    }

    @Route(HttpPost, {
        path: "postFooWithName"
    })
    public postFoo2() {
        this.postFoo();
    }

    
    @Route(HttpPatch)
    public patchFoo() {
        this.operationsRegistry.register(HttpVerb.PATCH);
    }

    @Route(HttpPatch, {
        path: "patchFooWithName"
    })
    public patchFoo2() {
        this.patchFoo();
    }

    
    @Route(HttpPut)
    public putFoo() {
        this.operationsRegistry.register(HttpVerb.PUT);
    }

    @Route(HttpPut, {
        path: "putFooWithName"
    })
    public putFoo2() {
        this.putFoo();
    }

    
    @Route(HttpGet)
    public getFoo(@Parameter(HttpRequest) request: Request) {
        this.operationsRegistry.register(request.method.toLowerCase());
    }

    @Route(HttpGet, {
        path: "getFooWithName"
    })
    public getFoo2(@Parameter(HttpRequest) request: Request) {
        this.getFoo(request);
    }

    
    @Route(HttpHead)
    public headFoo(@Parameter(HttpRequest) request: Request) {
        this.operationsRegistry.register(request.method.toLowerCase());
    }

    @Route(HttpHead, {
        path: "headFooWithName"
    })
    public headFoo2(@Parameter(HttpRequest) request: Request) {
        this.headFoo(request);
    }

    

}