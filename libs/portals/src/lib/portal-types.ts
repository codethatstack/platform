import { NgModuleFactory, Type, NgModuleRef, InjectionToken } from '@angular/core';

export const PORTAL_MODULE_TOKEN = new InjectionToken<ModuleLoaderDef[]>('Portal Modules');
export const PORTAL_COMPONENTS_TOKEN = new InjectionToken<ComponentRegistryItem[]>('Portal Components');
export const PORTAL_CONTEXT_DATA = new InjectionToken<any>('Portal Context Data');

export interface ModuleLoaderDef {
  moduleId: string,
  load: () => Promise<NgModuleFactory<any>|Type<any>|any>
}

export type ModuleRegistryType =
  { name: string, path: string }
  | ModuleLoaderDef
  | string;

export interface ComponentRegistryItem {
  componentId: string;
  componentType?: Type<any>;
  moduleId?: ModuleRegistryType;
  module?: NgModuleRef<any>;
}