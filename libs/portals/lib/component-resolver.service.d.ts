import { ComponentFactory, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { ComponentPortalRegistry } from './component-portal.registry';
import { PortalModuleRegistry } from './portal-module.registry';
export declare class ComponentResolverService {
    private moduleRegistry;
    private componentRegistry;
    constructor(moduleRegistry: PortalModuleRegistry, componentRegistry: ComponentPortalRegistry);
    getComponentFactory(componentId: string): Observable<[ComponentFactory<any>, Injector]>;
}
