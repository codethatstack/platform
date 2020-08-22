import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
var PortalOutletRegistry = /** @class */ (function () {
    function PortalOutletRegistry() {
        this._targets = new Map();
    }
    PortalOutletRegistry.prototype.register = function (outletId, viewContainer) {
        this._targets.set(outletId, viewContainer);
    };
    PortalOutletRegistry.prototype.remove = function (outletId) {
        this._targets.delete(outletId);
    };
    PortalOutletRegistry.prototype.getTarget = function (outletId) {
        return this._targets.has(outletId)
            ? this._targets.get(outletId)
            : null;
    };
    PortalOutletRegistry.ɵprov = i0.ɵɵdefineInjectable({ factory: function PortalOutletRegistry_Factory() { return new PortalOutletRegistry(); }, token: PortalOutletRegistry, providedIn: "root" });
    PortalOutletRegistry = __decorate([
        Injectable({ providedIn: 'root' })
    ], PortalOutletRegistry);
    return PortalOutletRegistry;
}());
export { PortalOutletRegistry };
//# sourceMappingURL=portal-outlet.registry.js.map