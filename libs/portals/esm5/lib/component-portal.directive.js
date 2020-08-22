import { __decorate, __metadata } from "tslib";
import { Directive, Input, ViewContainerRef, OnChanges, SimpleChanges, ComponentRef, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { PortalService } from './portal.service';
var ComponentPortalDirective = /** @class */ (function () {
    function ComponentPortalDirective(portalService, viewContainerRef) {
        var _this = this;
        this.portalService = portalService;
        this.viewContainerRef = viewContainerRef;
        this._componentId$ = new Subject();
        this.activated = new EventEmitter();
        this.deactivated = new EventEmitter();
        this._subscription = this._componentId$
            .pipe(tap(function () { return _this.destroyComponent(); }), switchMap(function (componentId) {
            return _this.portalService.createComponent({
                componentId: componentId,
                viewContainerRef: viewContainerRef,
                outletId: _this.attachTo,
                context: _this.context,
                content: _this.content
            });
        }))
            .subscribe(function (componentRef) {
            _this._componentRef = componentRef;
            _this.activated.emit(_this._componentRef);
            _this._componentRef.changeDetectorRef.markForCheck();
        });
    }
    ComponentPortalDirective.prototype.ngOnChanges = function (changes) {
        if (changes.componentId != null) {
            this._componentId$.next(changes.componentId.currentValue);
        }
    };
    ComponentPortalDirective.prototype.ngOnDestroy = function () {
        this._subscription.unsubscribe();
        this.destroyComponent();
    };
    ComponentPortalDirective.prototype.destroyComponent = function () {
        if (this._componentRef) {
            this.deactivated.emit(this._componentRef);
            this.viewContainerRef.clear();
            this._componentRef.destroy();
            this._componentRef = null;
        }
    };
    ComponentPortalDirective.ctorParameters = function () { return [
        { type: PortalService },
        { type: ViewContainerRef }
    ]; };
    __decorate([
        Input('ctsComponentPortal'),
        __metadata("design:type", String)
    ], ComponentPortalDirective.prototype, "componentId", void 0);
    __decorate([
        Input('ctsComponentPortalAttachTo'),
        __metadata("design:type", String)
    ], ComponentPortalDirective.prototype, "attachTo", void 0);
    __decorate([
        Input('ctsComponentPortalContext'),
        __metadata("design:type", Object)
    ], ComponentPortalDirective.prototype, "context", void 0);
    __decorate([
        Input('ctsComponentPortalContent'),
        __metadata("design:type", Array)
    ], ComponentPortalDirective.prototype, "content", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ComponentPortalDirective.prototype, "activated", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ComponentPortalDirective.prototype, "deactivated", void 0);
    ComponentPortalDirective = __decorate([
        Directive({
            selector: '[ctsComponentPortal]',
            exportAs: 'ctsComponentPortal'
        }),
        __metadata("design:paramtypes", [PortalService,
            ViewContainerRef])
    ], ComponentPortalDirective);
    return ComponentPortalDirective;
}());
export { ComponentPortalDirective };
//# sourceMappingURL=component-portal.directive.js.map