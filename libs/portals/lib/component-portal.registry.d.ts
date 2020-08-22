import { NgModuleRef } from '@angular/core';
import { ComponentRegistryItem } from './portal-types';
export declare class ComponentPortalRegistry {
    private _registry;
    private _modules;
    constructor(lazyComponents: ComponentRegistryItem[]);
    register(moduleId: string, values: ComponentRegistryItem[], moduleRef?: NgModuleRef<any>): void;
    get(componentId: string): ComponentRegistryItem;
    private registerComponents;
}
