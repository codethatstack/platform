import { NgModuleFactory, Type, NgModuleRef, InjectionToken, ViewContainerRef, Injector, NgModuleFactoryLoader } from '@angular/core';

export const PORTAL_MODULE_TOKEN = new InjectionToken<ModuleLoaderDef[]>('Portal Modules');
export const PORTAL_COMPONENTS_TOKEN = new InjectionToken<ComponentRegistryItem[]>('Portal Components');
export const PORTAL_CONTEXT_DATA = new InjectionToken<any>('Portal Context Data');

// tslint:disable-next-line: deprecation
export const PORTAL_MODULE_FACTORY_LOADER = new InjectionToken<NgModuleFactoryLoader>('Module Factory Loader');

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

export interface CreateComponentParams {
  componentId: string;
  outletId?: string;
  viewContainerRef: ViewContainerRef;
  injector?: Injector;
  context?: any;
  content?: any[][];
}