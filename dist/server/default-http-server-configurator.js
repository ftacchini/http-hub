"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routed_controller_1 = require("./../routed-controller");
const ts_hub_1 = require("ts-hub");
class DefaultHttpServerConfigurator {
    configureServer(server, container) {
        this.configureContainer(container);
    }
    configureContainer(container) {
        this.configureActivator(container);
    }
    configureActivator(container) {
        container.bind(ts_hub_1.Types.HttpControllerActivator).to(routed_controller_1.HttpControllerActivator);
    }
}
exports.DefaultHttpServerConfigurator = DefaultHttpServerConfigurator;
//# sourceMappingURL=default-http-server-configurator.js.map