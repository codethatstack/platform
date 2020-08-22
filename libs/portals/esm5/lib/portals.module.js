import { __decorate } from "tslib";
import { NgModule, NgModuleFactoryLoader, SystemJsNgModuleLoader } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalModuleDirective } from './portal-module.directive';
import { ComponentPortalDirective } from './component-portal.directive';
import { PortalOutletDirective } from './portal-outlet.directive';
var CtsPortalsModule = /** @class */ (function () {
    function CtsPortalsModule() {
    }
    CtsPortalsModule = __decorate([
        NgModule({
            imports: [CommonModule],
            declarations: [
                PortalModuleDirective,
                ComponentPortalDirective,
                PortalOutletDirective
            ],
            providers: [
                // Might drop support for old magic string implementation
                {
                    provide: NgModuleFactoryLoader,
                    useClass: SystemJsNgModuleLoader
                }
            ],
            exports: [
                PortalModuleDirective,
                ComponentPortalDirective,
                PortalOutletDirective
            ]
        })
    ], CtsPortalsModule);
    return CtsPortalsModule;
}());
export { CtsPortalsModule };
//# sourceMappingURL=portals.module.js.map