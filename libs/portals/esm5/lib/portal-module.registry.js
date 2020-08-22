import { __decorate, __metadata, __param } from "tslib";
import { Injectable, NgModuleRef, Injector, Compiler, NgModuleFactoryLoader, NgModuleFactory, Optional, Inject } from '@angular/core';
import { Observable, isObservable, from, of } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';
import { PORTAL_MODULE_TOKEN } from './portal-types';
import * as i0 from "@angular/core";
import * as i1 from "./portal-types";
var PortalModuleRegistry = /** @class */ (function () {
    function PortalModuleRegistry(lazyModules, injector, compiler, moduleLoader) {
        this.injector = injector;
        this.compiler = compiler;
        this.moduleLoader = moduleLoader;
        this._registry = new Map();
        this._cache = new Map();
        if (lazyModules != null) {
            this.register(lazyModules);
        }
    }
    PortalModuleRegistry.prototype.register = function (moduleLoaderDefs) {
        var _this = this;
        moduleLoaderDefs.forEach(function (value) {
            _this._registry.set(value.moduleId, value);
        });
    };
    PortalModuleRegistry.prototype.getOrLoad = function (moduleDef, localInjector) {
        var _this = this;
        return new Observable(function (subscriber) {
            if (moduleDef instanceof NgModuleRef) {
                subscriber.next(moduleDef);
                subscriber.complete();
                return;
            }
            var moduleId = _this.getModuleId(moduleDef);
            var moduleReference = _this._cache.get(moduleId);
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
            var loader$;
            if (typeof moduleDef === 'string') {
                var registryValue = _this._registry.get(moduleDef);
                if (registryValue == null) {
                    subscriber.error("No NgModule module loader specified for " + moduleDef);
                    return;
                }
                loader$ = from(registryValue.load())
                    .pipe(switchMap(function (moduleOrFactory) {
                    if (moduleOrFactory instanceof NgModuleFactory) {
                        return of(moduleOrFactory);
                    }
                    return from(_this.compiler.compileModuleAsync(moduleOrFactory));
                }));
            }
            else {
                /** Deprecated */
                var pathAndModule = moduleDef['path'] + "#" + moduleDef['name'];
                loader$ = from(_this.moduleLoader.load(pathAndModule));
            }
            var factory$ = loader$.pipe(map(function (factory) { return factory.create(localInjector || _this.injector); }), tap(function (ngModuleRef) { return _this._cache.set(moduleId, ngModuleRef); }));
            _this._cache.set(moduleId, factory$);
            factory$.subscribe(function (v) { return subscriber.next(v); });
        });
    };
    PortalModuleRegistry.prototype.getModuleId = function (moduleDef) {
        var _a;
        if (typeof moduleDef === 'string') {
            return moduleDef;
        }
        return (_a = moduleDef['moduleId']) !== null && _a !== void 0 ? _a : moduleDef['name'];
    };
    PortalModuleRegistry.ctorParameters = function () { return [
        { type: Array, decorators: [{ type: Optional }, { type: Inject, args: [PORTAL_MODULE_TOKEN,] }] },
        { type: Injector },
        { type: Compiler },
        { type: NgModuleFactoryLoader, decorators: [{ type: Optional }] }
    ]; };
    PortalModuleRegistry.ɵprov = i0.ɵɵdefineInjectable({ factory: function PortalModuleRegistry_Factory() { return new PortalModuleRegistry(i0.ɵɵinject(i1.PORTAL_MODULE_TOKEN, 8), i0.ɵɵinject(i0.INJECTOR), i0.ɵɵinject(i0.Compiler), i0.ɵɵinject(i0.NgModuleFactoryLoader, 8)); }, token: PortalModuleRegistry, providedIn: "root" });
    PortalModuleRegistry = __decorate([
        Injectable({ providedIn: 'root' }),
        __param(0, Optional()), __param(0, Inject(PORTAL_MODULE_TOKEN)),
        __param(3, Optional()),
        __metadata("design:paramtypes", [Array, Injector,
            Compiler,
            NgModuleFactoryLoader])
    ], PortalModuleRegistry);
    return PortalModuleRegistry;
}());
export { PortalModuleRegistry };
//# sourceMappingURL=portal-module.registry.js.map