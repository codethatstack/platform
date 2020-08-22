import { __decorate, __metadata } from "tslib";
import { Directive, Input, HostListener, Output, EventEmitter } from '@angular/core';
import { PortalModuleRegistry } from './portal-module.registry';
let PortalModuleDirective = class PortalModuleDirective {
    constructor(portalModuleRegistry) {
        this.portalModuleRegistry = portalModuleRegistry;
        this.isLoaded = false;
        this._errorLoading = false;
        this.loaded = new EventEmitter();
    }
    onMouseEnter() {
        if (!this.isLoaded && !this._errorLoading && this.moduleId != null && this._loading == null) {
            // Only need to load first time mouse enters
            this._loading = this.portalModuleRegistry.getOrLoad(this.moduleId)
                .subscribe(module => {
                this.isLoaded = true;
                this.loaded.emit(module);
            }, err => { this._errorLoading = true; });
        }
    }
};
PortalModuleDirective.ctorParameters = () => [
    { type: PortalModuleRegistry }
];
__decorate([
    Input('ctsPortalModule'),
    __metadata("design:type", String)
], PortalModuleDirective.prototype, "moduleId", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], PortalModuleDirective.prototype, "loaded", void 0);
__decorate([
    HostListener('mouseenter'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PortalModuleDirective.prototype, "onMouseEnter", null);
PortalModuleDirective = __decorate([
    Directive({
        selector: '[ctsPortalModule]',
        exportAs: 'ctsPortalModule'
    }),
    __metadata("design:paramtypes", [PortalModuleRegistry])
], PortalModuleDirective);
export { PortalModuleDirective };
//# sourceMappingURL=portal-module.directive.js.map