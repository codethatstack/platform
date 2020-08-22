import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ComponentPortalRegistry } from './component-portal.registry';
import { PortalModuleRegistry } from './portal-module.registry';
import * as i0 from "@angular/core";
import * as i1 from "./portal-module.registry";
import * as i2 from "./component-portal.registry";
let ComponentResolverService = class ComponentResolverService {
    constructor(moduleRegistry, componentRegistry) {
        this.moduleRegistry = moduleRegistry;
        this.componentRegistry = componentRegistry;
    }
    getComponentFactory(componentId) {
        return new Observable(subscriber => {
            let componentRegItem = this.componentRegistry.get(componentId);
            if (componentRegItem == null) {
                subscriber.error(`ComponentId ${componentId} is not registered`);
            }
            if (componentRegItem.moduleId == null && componentRegItem.module == null) {
                subscriber.error(`Module for ${componentId} is not defined`);
            }
            const factoryResolver = (moduleRef, componentType) => {
                const componentFactory = moduleRef.componentFactoryResolver.resolveComponentFactory(componentType);
                subscriber.next([componentFactory, moduleRef.injector]);
                subscriber.complete();
            };
            if (componentRegItem.module != null) {
                factoryResolver(componentRegItem.module, componentRegItem.componentType);
            }
            else {
                this.moduleRegistry.getOrLoad(componentRegItem.moduleId)
                    .subscribe(moduleRef => {
                    if (componentRegItem.componentType == null) {
                        componentRegItem = this.componentRegistry.get(componentId); // Retrieve entry again after module has been loaded.
                        if (componentRegItem.componentType == null) {
                            throw new Error(`Component ${componentId} type has not been registered`);
                        }
                    }
                    factoryResolver(moduleRef, componentRegItem.componentType);
                });
            }
        });
    }
};
ComponentResolverService.ctorParameters = () => [
    { type: PortalModuleRegistry },
    { type: ComponentPortalRegistry }
];
ComponentResolverService.ɵprov = i0.ɵɵdefineInjectable({ factory: function ComponentResolverService_Factory() { return new ComponentResolverService(i0.ɵɵinject(i1.PortalModuleRegistry), i0.ɵɵinject(i2.ComponentPortalRegistry)); }, token: ComponentResolverService, providedIn: "root" });
ComponentResolverService = __decorate([
    Injectable({ providedIn: 'root' }),
    __metadata("design:paramtypes", [PortalModuleRegistry,
        ComponentPortalRegistry])
], ComponentResolverService);
export { ComponentResolverService };
//# sourceMappingURL=component-resolver.service.js.map