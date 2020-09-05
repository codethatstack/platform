import { NgModule, SystemJsNgModuleLoader, NgModuleFactoryLoader } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalModuleDirective } from './portal-module.directive';
import { ComponentPortalDirective } from './component-portal.directive';
import { PortalOutletDirective } from './portal-outlet.directive';
import { PORTAL_MODULE_FACTORY_LOADER } from './portal-types';

// tslint:disable-next-line: deprecation
export function portalFactoryLoader(loader: NgModuleFactoryLoader): NgModuleFactoryLoader {
  return loader;
}

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
      provide: PORTAL_MODULE_FACTORY_LOADER,
      useFactory: portalFactoryLoader,
      // tslint:disable-next-line: deprecation
      deps: [SystemJsNgModuleLoader]
    },
    // tslint:disable-next-line: deprecation
    SystemJsNgModuleLoader
  ],
  exports: [
    PortalModuleDirective,
    ComponentPortalDirective,
    PortalOutletDirective
  ]
})
export class CtsPortalsModule {}
