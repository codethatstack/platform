import { __decorate, __metadata } from "tslib";
import { Directive, Input, ViewContainerRef, OnChanges, SimpleChanges, ComponentRef, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { PortalService } from './portal.service';
let ComponentPortalDirective = class ComponentPortalDirective {
    constructor(portalService, viewContainerRef) {
        this.portalService = portalService;
        this.viewContainerRef = viewContainerRef;
        this._componentId$ = new Subject();
        this.activated = new EventEmitter();
        this.deactivated = new EventEmitter();
        this._subscription = this._componentId$
            .pipe(tap(() => this.destroyComponent()), switchMap(componentId => {
            return this.portalService.createComponent({
                componentId,
                viewContainerRef,
                outletId: this.attachTo,
                context: this.context,
                content: this.content
            });
        }))
            .subscribe(componentRef => {
            this._componentRef = componentRef;
            this.activated.emit(this._componentRef);
            this._componentRef.changeDetectorRef.markForCheck();
        });
    }
    ngOnChanges(changes) {
        if (changes.componentId != null) {
            this._componentId$.next(changes.componentId.currentValue);
        }
    }
    ngOnDestroy() {
        this._subscription.unsubscribe();
        this.destroyComponent();
    }
    destroyComponent() {
        if (this._componentRef) {
            this.deactivated.emit(this._componentRef);
            this.viewContainerRef.clear();
            this._componentRef.destroy();
            this._componentRef = null;
        }
    }
};
ComponentPortalDirective.ctorParameters = () => [
    { type: PortalService },
    { type: ViewContainerRef }
];
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
export { ComponentPortalDirective };
//# sourceMappingURL=component-portal.directive.js.map