import { NgModuleRef, Injector, Compiler, NgModuleFactoryLoader } from '@angular/core';
import { Observable } from 'rxjs';
import { ModuleLoaderDef, ModuleRegistryType } from './portal-types';
export declare class PortalModuleRegistry {
    private injector;
    private compiler;
    private moduleLoader;
    private _registry;
    private _cache;
    constructor(lazyModules: ModuleLoaderDef[], injector: Injector, compiler: Compiler, moduleLoader: NgModuleFactoryLoader);
    register(moduleLoaderDefs: ModuleLoaderDef[]): void;
    getOrLoad(moduleDef: ModuleRegistryType, localInjector?: Injector): Observable<NgModuleRef<any>>;
    private getModuleId;
}
