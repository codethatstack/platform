import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ComponentResolverService } from './component-resolver.service';
import { PortalOutletRegistry } from './portal-outlet.registry';
import { PortalInjector } from './portal-injector';
import { PORTAL_CONTEXT_DATA } from './portal-types';
import * as i0 from "@angular/core";
import * as i1 from "./component-resolver.service";
import * as i2 from "./portal-outlet.registry";
let PortalService = class PortalService {
    constructor(componentResolverService, portalOutletRegistry) {
        this.componentResolverService = componentResolverService;
        this.portalOutletRegistry = portalOutletRegistry;
    }
    createComponent({ componentId, outletId, viewContainerRef, injector, context, content }) {
        const hostContainerRef = outletId != null ? this.portalOutletRegistry.getTarget(outletId) : viewContainerRef;
        return this.componentResolverService.getComponentFactory(componentId)
            .pipe(map(([componentFactory, moduleInjector]) => {
            const injectionTokens = new WeakMap([
                [PORTAL_CONTEXT_DATA, context]
            ]);
            const portalInjector = new PortalInjector(injector !== null && injector !== void 0 ? injector : moduleInjector, injectionTokens);
            const componentRef = componentFactory.create(portalInjector, content);
            hostContainerRef.clear();
            hostContainerRef.insert(componentRef.hostView);
            componentRef.changeDetectorRef.markForCheck();
            return componentRef;
        }));
    }
};
PortalService.ctorParameters = () => [
    { type: ComponentResolverService },
    { type: PortalOutletRegistry }
];
PortalService.ɵprov = i0.ɵɵdefineInjectable({ factory: function PortalService_Factory() { return new PortalService(i0.ɵɵinject(i1.ComponentResolverService), i0.ɵɵinject(i2.PortalOutletRegistry)); }, token: PortalService, providedIn: "root" });
PortalService = __decorate([
    Injectable({ providedIn: 'root' }),
    __metadata("design:paramtypes", [ComponentResolverService,
        PortalOutletRegistry])
], PortalService);
export { PortalService };
//# sourceMappingURL=portal.service.js.map