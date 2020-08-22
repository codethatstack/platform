import { __decorate, __metadata, __param } from "tslib";
import { Injectable, Optional, Inject } from '@angular/core';
import { PORTAL_COMPONENTS_TOKEN } from './portal-types';
import * as i0 from "@angular/core";
import * as i1 from "./portal-types";
let ComponentPortalRegistry = class ComponentPortalRegistry {
    constructor(lazyComponents) {
        this._registry = new Map();
        this._modules = new Map();
        this.registerComponents(lazyComponents);
    }
    register(moduleId, values, moduleRef) {
        if (!this._modules.has(moduleId)) {
            this._modules.set(moduleId, values);
        }
        this.registerComponents(values, moduleRef);
    }
    get(componentId) {
        return this._registry.get(componentId);
    }
    registerComponents(values, moduleRef) {
        if (values == null)
            return;
        values.forEach(item => {
            this._registry.set(item.componentId, Object.assign(Object.assign({}, item), { module: moduleRef }));
        });
    }
};
ComponentPortalRegistry.ctorParameters = () => [
    { type: Array, decorators: [{ type: Optional }, { type: Inject, args: [PORTAL_COMPONENTS_TOKEN,] }] }
];
ComponentPortalRegistry.ɵprov = i0.ɵɵdefineInjectable({ factory: function ComponentPortalRegistry_Factory() { return new ComponentPortalRegistry(i0.ɵɵinject(i1.PORTAL_COMPONENTS_TOKEN, 8)); }, token: ComponentPortalRegistry, providedIn: "root" });
ComponentPortalRegistry = __decorate([
    Injectable({ providedIn: 'root' }),
    __param(0, Optional()), __param(0, Inject(PORTAL_COMPONENTS_TOKEN)),
    __metadata("design:paramtypes", [Array])
], ComponentPortalRegistry);
export { ComponentPortalRegistry };
//# sourceMappingURL=component-portal.registry.js.map