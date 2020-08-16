import { NgModule, NgModuleFactoryLoader, SystemJsNgModuleLoader } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalModuleDirective } from './portal-module.directive';
import { ComponentPortalDirective } from './component-portal.directive';
import { PortalOutletDirective } from './portal-outlet.directive';

@NgModule({
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
export class CtsPortalsModule {}
