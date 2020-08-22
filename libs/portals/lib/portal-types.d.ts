import { NgModuleFactory, Type, NgModuleRef, InjectionToken, ViewContainerRef, Injector } from '@angular/core';
export declare const PORTAL_MODULE_TOKEN: InjectionToken<ModuleLoaderDef[]>;
export declare const PORTAL_COMPONENTS_TOKEN: InjectionToken<ComponentRegistryItem[]>;
export declare const PORTAL_CONTEXT_DATA: InjectionToken<any>;
export interface ModuleLoaderDef {
    moduleId: string;
    load: () => Promise<NgModuleFactory<any> | Type<any> | any>;
}
export declare type ModuleRegistryType = {
    name: string;
    path: string;
} | ModuleLoaderDef | string;
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
