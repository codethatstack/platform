import { Injectable, NgModuleRef, Optional, Inject } from '@angular/core';
import { ComponentRegistryItem, PORTAL_COMPONENTS_TOKEN } from './portal-types';

@Injectable({ providedIn: 'root' })
export class ComponentPortalRegistry {

  private _registry = new Map<string, ComponentRegistryItem>();
  private _modules = new Map<string, ComponentRegistryItem[]>();

  constructor(@Optional() @Inject(PORTAL_COMPONENTS_TOKEN) lazyComponents: ComponentRegistryItem[]) {
    this.registerComponents(lazyComponents)
  }

  public register(moduleId: string, values: ComponentRegistryItem[], moduleRef?: NgModuleRef<any>): void {
    if (!this._modules.has(moduleId)) {
      this._modules.set(moduleId, values);
    }
    this.registerComponents(values, moduleRef);
  }

  public get(componentId: string): ComponentRegistryItem {
    return this._registry.get(componentId);
  }

  private registerComponents(values: ComponentRegistryItem[], moduleRef?: NgModuleRef<any>): void {
    if (values == null) return;

    values.forEach(item => {
      this._registry.set(item.componentId, { ...item, module: moduleRef });
    });
  }
}