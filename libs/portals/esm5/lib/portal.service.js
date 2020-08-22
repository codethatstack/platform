import { __decorate, __metadata, __read } from "tslib";
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ComponentResolverService } from './component-resolver.service';
import { PortalOutletRegistry } from './portal-outlet.registry';
import { PortalInjector } from './portal-injector';
import { PORTAL_CONTEXT_DATA } from './portal-types';
import * as i0 from "@angular/core";
import * as i1 from "./component-resolver.service";
import * as i2 from "./portal-outlet.registry";
var PortalService = /** @class */ (function () {
    function PortalService(componentResolverService, portalOutletRegistry) {
        this.componentResolverService = componentResolverService;
        this.portalOutletRegistry = portalOutletRegistry;
    }
    PortalService.prototype.createComponent = function (_a) {
        var componentId = _a.componentId, outletId = _a.outletId, viewContainerRef = _a.viewContainerRef, injector = _a.injector, context = _a.context, content = _a.content;
        var hostContainerRef = outletId != null ? this.portalOutletRegistry.getTarget(outletId) : viewContainerRef;
        return this.componentResolverService.getComponentFactory(componentId)
            .pipe(map(function (_a) {
            var _b = __read(_a, 2), componentFactory = _b[0], moduleInjector = _b[1];
            var injectionTokens = new WeakMap([
                [PORTAL_CONTEXT_DATA, context]
            ]);
            var portalInjector = new PortalInjector(injector !== null && injector !== void 0 ? injector : moduleInjector, injectionTokens);
            var componentRef = componentFactory.create(portalInjector, content);
            hostContainerRef.clear();
            hostContainerRef.insert(componentRef.hostView);
            componentRef.changeDetectorRef.markForCheck();
            return componentRef;
        }));
    };
    PortalService.ctorParameters = function () { return [
        { type: ComponentResolverService },
        { type: PortalOutletRegistry }
    ]; };
    PortalService.ɵprov = i0.ɵɵdefineInjectable({ factory: function PortalService_Factory() { return new PortalService(i0.ɵɵinject(i1.ComponentResolverService), i0.ɵɵinject(i2.PortalOutletRegistry)); }, token: PortalService, providedIn: "root" });
    PortalService = __decorate([
        Injectable({ providedIn: 'root' }),
        __metadata("design:paramtypes", [ComponentResolverService,
            PortalOutletRegistry])
    ], PortalService);
    return PortalService;
}());
export { PortalService };
//# sourceMappingURL=portal.service.js.map