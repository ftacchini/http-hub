import { Router } from 'express';
import { ServerSupport } from "ts-hub";
import { HttpServer } from "./http-server";

export class HttpServerSupport implements ServerSupport {

    private static _instance: HttpServerSupport;
    public static get instance() {
        return this._instance || (this._instance = new HttpServerSupport());
    }

    private constructor() {

    }

    public supportsServer(server: any): boolean {
        return Object.getPrototypeOf(server) == Router;
    }
}