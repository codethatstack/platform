import { __decorate, __metadata } from "tslib";
import { Directive, Input, OnInit, ViewContainerRef, OnDestroy } from '@angular/core';
import { PortalOutletRegistry } from './portal-outlet.registry';
let PortalOutletDirective = class PortalOutletDirective {
    constructor(portalOutletRegistry, viewContainer) {
        this.portalOutletRegistry = portalOutletRegistry;
        this.viewContainer = viewContainer;
    }
    ngOnInit() {
        this.portalOutletRegistry.register(this.outletId, this.viewContainer);
    }
    ngOnDestroy() {
        this.portalOutletRegistry.remove(this.outletId);
    }
};
PortalOutletDirective.ctorParameters = () => [
    { type: PortalOutletRegistry },
    { type: ViewContainerRef }
];
__decorate([
    Input('ctsPortalOutlet'),
    __metadata("design:type", String)
], PortalOutletDirective.prototype, "outletId", void 0);
PortalOutletDirective = __decorate([
    Directive({
        selector: '[ctsPortalOutlet]'
    }),
    __metadata("design:paramtypes", [PortalOutletRegistry,
        ViewContainerRef])
], PortalOutletDirective);
export { PortalOutletDirective };
//# sourceMappingURL=portal-outlet.directive.js.map