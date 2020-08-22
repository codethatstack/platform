import { __decorate, __metadata } from "tslib";
import { Directive, Input, HostListener, Output, EventEmitter } from '@angular/core';
import { PortalModuleRegistry } from './portal-module.registry';
var PortalModuleDirective = /** @class */ (function () {
    function PortalModuleDirective(portalModuleRegistry) {
        this.portalModuleRegistry = portalModuleRegistry;
        this.isLoaded = false;
        this._errorLoading = false;
        this.loaded = new EventEmitter();
    }
    PortalModuleDirective.prototype.onMouseEnter = function () {
        var _this = this;
        if (!this.isLoaded && !this._errorLoading && this.moduleId != null && this._loading == null) {
            // Only need to load first time mouse enters
            this._loading = this.portalModuleRegistry.getOrLoad(this.moduleId)
                .subscribe(function (module) {
                _this.isLoaded = true;
                _this.loaded.emit(module);
            }, function (err) { _this._errorLoading = true; });
        }
    };
    PortalModuleDirective.ctorParameters = function () { return [
        { type: PortalModuleRegistry }
    ]; };
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
    return PortalModuleDirective;
}());
export { PortalModuleDirective };
//# sourceMappingURL=portal-module.directive.js.map