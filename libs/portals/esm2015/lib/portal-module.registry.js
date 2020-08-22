import { __decorate, __metadata, __param } from "tslib";
import { Injectable, NgModuleRef, Injector, Compiler, NgModuleFactoryLoader, NgModuleFactory, Optional, Inject } from '@angular/core';
import { Observable, isObservable, from, of } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';
import { PORTAL_MODULE_TOKEN } from './portal-types';
import * as i0 from "@angular/core";
import * as i1 from "./portal-types";
let PortalModuleRegistry = class PortalModuleRegistry {
    constructor(lazyModules, injector, compiler, moduleLoader) {
        this.injector = injector;
        this.compiler = compiler;
        this.moduleLoader = moduleLoader;
        this._registry = new Map();
        this._cache = new Map();
        if (lazyModules != null) {
            this.register(lazyModules);
        }
    }
    register(moduleLoaderDefs) {
        moduleLoaderDefs.forEach(value => {
            this._registry.set(value.moduleId, value);
        });
    }
    getOrLoad(moduleDef, localInjector) {
        return new Observable(subscriber => {
            if (moduleDef instanceof NgModuleRef) {
                subscriber.next(moduleDef);
                subscriber.complete();
                return;
            }
            const moduleId = this.getModuleId(moduleDef);
            const moduleReference = this._cache.get(moduleId);
            if (moduleReference != null) {
                if (isObservable(moduleReference)) {
                    moduleReference.subscribe(subscriber);
                }
                else {
                    subscriber.next(moduleReference);
                    subscriber.complete();
                }
                return;
            }
            let loader$;
            if (typeof moduleDef === 'string') {
                const registryValue = this._registry.get(moduleDef);
                if (registryValue == null) {
                    subscriber.error(`No NgModule module loader specified for ${moduleDef}`);
                    return;
                }
                loader$ = from(registryValue.load())
                    .pipe(switchMap(moduleOrFactory => {
                    if (moduleOrFactory instanceof NgModuleFactory) {
                        return of(moduleOrFactory);
                    }
                    return from(this.compiler.compileModuleAsync(moduleOrFactory));
                }));
            }
            else {
                /** Deprecated */
                const pathAndModule = `${moduleDef['path']}#${moduleDef['name']}`;
                loader$ = from(this.moduleLoader.load(pathAndModule));
            }
            const factory$ = loader$.pipe(map((factory) => factory.create(localInjector || this.injector)), tap(ngModuleRef => this._cache.set(moduleId, ngModuleRef)));
            this._cache.set(moduleId, factory$);
            factory$.subscribe(v => subscriber.next(v));
        });
    }
    getModuleId(moduleDef) {
        var _a;
        if (typeof moduleDef === 'string') {
            return moduleDef;
        }
        return (_a = moduleDef['moduleId']) !== null && _a !== void 0 ? _a : moduleDef['name'];
    }
};
PortalModuleRegistry.ctorParameters = () => [
    { type: Array, decorators: [{ type: Optional }, { type: Inject, args: [PORTAL_MODULE_TOKEN,] }] },
    { type: Injector },
    { type: Compiler },
    { type: NgModuleFactoryLoader, decorators: [{ type: Optional }] }
];
PortalModuleRegistry.ɵprov = i0.ɵɵdefineInjectable({ factory: function PortalModuleRegistry_Factory() { return new PortalModuleRegistry(i0.ɵɵinject(i1.PORTAL_MODULE_TOKEN, 8), i0.ɵɵinject(i0.INJECTOR), i0.ɵɵinject(i0.Compiler), i0.ɵɵinject(i0.NgModuleFactoryLoader, 8)); }, token: PortalModuleRegistry, providedIn: "root" });
PortalModuleRegistry = __decorate([
    Injectable({ providedIn: 'root' }),
    __param(0, Optional()), __param(0, Inject(PORTAL_MODULE_TOKEN)),
    __param(3, Optional()),
    __metadata("design:paramtypes", [Array, Injector,
        Compiler,
        NgModuleFactoryLoader])
], PortalModuleRegistry);
export { PortalModuleRegistry };
//# sourceMappingURL=portal-module.registry.js.map