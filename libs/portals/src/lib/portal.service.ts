import { Injectable, ComponentRef } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ComponentResolverService } from './component-resolver.service';
import { PortalOutletRegistry } from './portal-outlet.registry';
import { PortalInjector } from './portal-injector';
import { PORTAL_CONTEXT_DATA, CreateComponentParams } from './portal-types';

@Injectable({ providedIn: 'root' })
export class PortalService {

  constructor(
    private componentResolverService: ComponentResolverService,
    private portalOutletRegistry: PortalOutletRegistry) { }

  createComponent({ componentId, outletId, viewContainerRef, injector, context, content }: CreateComponentParams): Observable<ComponentRef<any>> {
    const hostContainerRef = outletId != null ? this.portalOutletRegistry.getTarget(outletId) : viewContainerRef;

    return this.componentResolverService.getComponentFactory(componentId)
      .pipe(
        map(([componentFactory, moduleInjector]) => {
          const injectionTokens = new WeakMap<any, any>([
            [PORTAL_CONTEXT_DATA, context]
          ]);
          const portalInjector = new PortalInjector(injector ?? moduleInjector, injectionTokens);

          const componentRef = componentFactory.create(portalInjector, content);
          hostContainerRef.clear();
          hostContainerRef.insert(componentRef.hostView);
          componentRef.changeDetectorRef.markForCheck();
          return componentRef;
        })
      );
  }
}