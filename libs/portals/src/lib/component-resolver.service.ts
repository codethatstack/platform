
import { Injectable, ComponentFactory, Injector, NgModuleRef, Type } from '@angular/core';
import { Observable } from 'rxjs';

import { ComponentPortalRegistry } from './component-portal.registry';
import { PortalModuleRegistry } from './portal-module.registry';


@Injectable({ providedIn: 'root' })
export class ComponentResolverService {

  constructor(
    private moduleRegistry: PortalModuleRegistry,
    private componentRegistry: ComponentPortalRegistry) { }

  public getComponentFactory(componentId: string): Observable<[ComponentFactory<any>, Injector]> {

    return new Observable(subscriber => {

      let componentRegItem = this.componentRegistry.get(componentId);
      if (componentRegItem == null) {
        subscriber.error(`ComponentId ${componentId} is not registered`);
      }

      if (componentRegItem.moduleId == null && componentRegItem.module == null) {
        subscriber.error(`Module for ${componentId} is not defined`);
      }

      const factoryResolver = (moduleRef: NgModuleRef<any>, componentType: Type<any>) => {
        const componentFactory = moduleRef.componentFactoryResolver.resolveComponentFactory(componentType);
        subscriber.next([componentFactory, moduleRef.injector]);
        subscriber.complete();
      }

      if (componentRegItem.module != null) {
        factoryResolver(componentRegItem.module, componentRegItem.componentType);
      } else {
        this.moduleRegistry.getOrLoad(componentRegItem.moduleId)
          .subscribe(moduleRef => {
            if (componentRegItem.componentType == null) {
              componentRegItem = this.componentRegistry.get(componentId); // Retrieve entry again after module has been loaded.
              if (componentRegItem.componentType == null) {
                throw new Error(`Component ${componentId} type has not been registered`);
              }
            }
            factoryResolver(moduleRef, componentRegItem.componentType);
          });
      }
    });
  }

}