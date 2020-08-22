import { __decorate, __metadata } from "tslib";
import { Directive, Input, OnInit, ViewContainerRef, OnDestroy } from '@angular/core';
import { PortalOutletRegistry } from './portal-outlet.registry';
var PortalOutletDirective = /** @class */ (function () {
    function PortalOutletDirective(portalOutletRegistry, viewContainer) {
        this.portalOutletRegistry = portalOutletRegistry;
        this.viewContainer = viewContainer;
    }
    PortalOutletDirective.prototype.ngOnInit = function () {
        this.portalOutletRegistry.register(this.outletId, this.viewContainer);
    };
    PortalOutletDirective.prototype.ngOnDestroy = function () {
        this.portalOutletRegistry.remove(this.outletId);
    };
    PortalOutletDirective.ctorParameters = function () { return [
        { type: PortalOutletRegistry },
        { type: ViewContainerRef }
    ]; };
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
    return PortalOutletDirective;
}());
export { PortalOutletDirective };
//# sourceMappingURL=portal-outlet.directive.js.map