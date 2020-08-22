import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
let PortalOutletRegistry = class PortalOutletRegistry {
    constructor() {
        this._targets = new Map();
    }
    register(outletId, viewContainer) {
        this._targets.set(outletId, viewContainer);
    }
    remove(outletId) {
        this._targets.delete(outletId);
    }
    getTarget(outletId) {
        return this._targets.has(outletId)
            ? this._targets.get(outletId)
            : null;
    }
};
PortalOutletRegistry.ɵprov = i0.ɵɵdefineInjectable({ factory: function PortalOutletRegistry_Factory() { return new PortalOutletRegistry(); }, token: PortalOutletRegistry, providedIn: "root" });
PortalOutletRegistry = __decorate([
    Injectable({ providedIn: 'root' })
], PortalOutletRegistry);
export { PortalOutletRegistry };
//# sourceMappingURL=portal-outlet.registry.js.map