import { EventEmitter, NgModuleRef } from '@angular/core';
import { PortalModuleRegistry } from './portal-module.registry';
export declare class PortalModuleDirective {
    private portalModuleRegistry;
    isLoaded: boolean;
    private _errorLoading;
    private _loading;
    moduleId: string;
    loaded: EventEmitter<NgModuleRef<any>>;
    constructor(portalModuleRegistry: PortalModuleRegistry);
    onMouseEnter(): void;
}
