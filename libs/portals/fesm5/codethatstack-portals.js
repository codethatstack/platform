import { __decorate, __param, __metadata, __assign, __read } from 'tslib';
import { InjectionToken, NgModuleRef, NgModuleFactory, Optional, Inject, Injector, Compiler, NgModuleFactoryLoader, ɵɵdefineInjectable, ɵɵinject, INJECTOR, Injectable, EventEmitter, Input, Output, HostListener, Directive, ViewContainerRef, NgModule, SystemJsNgModuleLoader } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, isObservable, from, of, Subject } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';

var PORTAL_MODULE_TOKEN = new InjectionToken('Portal Modules');
var PORTAL_COMPONENTS_TOKEN = new InjectionToken('Portal Components');
var PORTAL_CONTEXT_DATA = new InjectionToken('Portal Context Data');

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
    PortalModuleRegistry.ɵprov = ɵɵdefineInjectable({ factory: function PortalModuleRegistry_Factory() { return new PortalModuleRegistry(ɵɵinject(PORTAL_MODULE_TOKEN, 8), ɵɵinject(INJECTOR), ɵɵinject(Compiler), ɵɵinject(NgModuleFactoryLoader, 8)); }, token: PortalModuleRegistry, providedIn: "root" });
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

var PortalModuleDirective = /** @class */ (function () {
    function PortalModuleDirective(portalModuleRegistry) {
        this.portalModuleRegistry = portalModuleRegistry;
        this.isLoaded = false;
        this._errorLoading = false;
        this.loaded = new EventEmitter();
    }
    PortalModuleDirective.prototype.onMouseEnter = function () {
        var _this = this;
        if (!this.isLoaded && !this._errorLoading && this.moduleId != null && this._loading == null) {
            // Only need to load first time mouse enters
            this._loading = this.portalModuleRegistry.getOrLoad(this.moduleId)
                .subscribe(function (module) {
                _this.isLoaded = true;
                _this.loaded.emit(module);
            }, function (err) { _this._errorLoading = true; });
        }
    };
    PortalModuleDirective.ctorParameters = function () { return [
        { type: PortalModuleRegistry }
    ]; };
    __decorate([
        Input('ctsPortalModule'),
        __metadata("design:type", String)
    ], PortalModuleDirective.prototype, "moduleId", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], PortalModuleDirective.prototype, "loaded", void 0);
    __decorate([
        HostListener('mouseenter'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], PortalModuleDirective.prototype, "onMouseEnter", null);
    PortalModuleDirective = __decorate([
        Directive({
            selector: '[ctsPortalModule]',
            exportAs: 'ctsPortalModule'
        }),
        __metadata("design:paramtypes", [PortalModuleRegistry])
    ], PortalModuleDirective);
    return PortalModuleDirective;
}());

var ComponentPortalRegistry = /** @class */ (function () {
    function ComponentPortalRegistry(lazyComponents) {
        this._registry = new Map();
        this._modules = new Map();
        this.registerComponents(lazyComponents);
    }
    ComponentPortalRegistry.prototype.register = function (moduleId, values, moduleRef) {
        if (!this._modules.has(moduleId)) {
            this._modules.set(moduleId, values);
        }
        this.registerComponents(values, moduleRef);
    };
    ComponentPortalRegistry.prototype.get = function (componentId) {
        return this._registry.get(componentId);
    };
    ComponentPortalRegistry.prototype.registerComponents = function (values, moduleRef) {
        var _this = this;
        if (values == null)
            return;
        values.forEach(function (item) {
            _this._registry.set(item.componentId, __assign(__assign({}, item), { module: moduleRef }));
        });
    };
    ComponentPortalRegistry.ctorParameters = function () { return [
        { type: Array, decorators: [{ type: Optional }, { type: Inject, args: [PORTAL_COMPONENTS_TOKEN,] }] }
    ]; };
    ComponentPortalRegistry.ɵprov = ɵɵdefineInjectable({ factory: function ComponentPortalRegistry_Factory() { return new ComponentPortalRegistry(ɵɵinject(PORTAL_COMPONENTS_TOKEN, 8)); }, token: ComponentPortalRegistry, providedIn: "root" });
    ComponentPortalRegistry = __decorate([
        Injectable({ providedIn: 'root' }),
        __param(0, Optional()), __param(0, Inject(PORTAL_COMPONENTS_TOKEN)),
        __metadata("design:paramtypes", [Array])
    ], ComponentPortalRegistry);
    return ComponentPortalRegistry;
}());

var ComponentResolverService = /** @class */ (function () {
    function ComponentResolverService(moduleRegistry, componentRegistry) {
        this.moduleRegistry = moduleRegistry;
        this.componentRegistry = componentRegistry;
    }
    ComponentResolverService.prototype.getComponentFactory = function (componentId) {
        var _this = this;
        return new Observable(function (subscriber) {
            var componentRegItem = _this.componentRegistry.get(componentId);
            if (componentRegItem == null) {
                subscriber.error("ComponentId " + componentId + " is not registered");
            }
            if (componentRegItem.moduleId == null && componentRegItem.module == null) {
                subscriber.error("Module for " + componentId + " is not defined");
            }
            var factoryResolver = function (moduleRef, componentType) {
                var componentFactory = moduleRef.componentFactoryResolver.resolveComponentFactory(componentType);
                subscriber.next([componentFactory, moduleRef.injector]);
                subscriber.complete();
            };
            if (componentRegItem.module != null) {
                factoryResolver(componentRegItem.module, componentRegItem.componentType);
            }
            else {
                _this.moduleRegistry.getOrLoad(componentRegItem.moduleId)
                    .subscribe(function (moduleRef) {
                    if (componentRegItem.componentType == null) {
                        componentRegItem = _this.componentRegistry.get(componentId); // Retrieve entry again after module has been loaded.
                        if (componentRegItem.componentType == null) {
                            throw new Error("Component " + componentId + " type has not been registered");
                        }
                    }
                    factoryResolver(moduleRef, componentRegItem.componentType);
                });
            }
        });
    };
    ComponentResolverService.ctorParameters = function () { return [
        { type: PortalModuleRegistry },
        { type: ComponentPortalRegistry }
    ]; };
    ComponentResolverService.ɵprov = ɵɵdefineInjectable({ factory: function ComponentResolverService_Factory() { return new ComponentResolverService(ɵɵinject(PortalModuleRegistry), ɵɵinject(ComponentPortalRegistry)); }, token: ComponentResolverService, providedIn: "root" });
    ComponentResolverService = __decorate([
        Injectable({ providedIn: 'root' }),
        __metadata("design:paramtypes", [PortalModuleRegistry,
            ComponentPortalRegistry])
    ], ComponentResolverService);
    return ComponentResolverService;
}());

var PortalOutletRegistry = /** @class */ (function () {
    function PortalOutletRegistry() {
        this._targets = new Map();
    }
    PortalOutletRegistry.prototype.register = function (outletId, viewContainer) {
        this._targets.set(outletId, viewContainer);
    };
    PortalOutletRegistry.prototype.remove = function (outletId) {
        this._targets.delete(outletId);
    };
    PortalOutletRegistry.prototype.getTarget = function (outletId) {
        return this._targets.has(outletId)
            ? this._targets.get(outletId)
            : null;
    };
    PortalOutletRegistry.ɵprov = ɵɵdefineInjectable({ factory: function PortalOutletRegistry_Factory() { return new PortalOutletRegistry(); }, token: PortalOutletRegistry, providedIn: "root" });
    PortalOutletRegistry = __decorate([
        Injectable({ providedIn: 'root' })
    ], PortalOutletRegistry);
    return PortalOutletRegistry;
}());

var PortalInjector = /** @class */ (function () {
    function PortalInjector(_parentInjector, _customTokens) {
        this._parentInjector = _parentInjector;
        this._customTokens = _customTokens;
    }
    PortalInjector.prototype.get = function (token, notFoundValue) {
        var value = this._customTokens.get(token);
        if (typeof value !== 'undefined') {
            return value;
        }
        return this._parentInjector.get(token, notFoundValue);
    };
    return PortalInjector;
}());

var PortalService = /** @class */ (function () {
    function PortalService(componentResolverService, portalOutletRegistry) {
        this.componentResolverService = componentResolverService;
        this.portalOutletRegistry = portalOutletRegistry;
    }
    PortalService.prototype.createComponent = function (_a) {
        var componentId = _a.componentId, outletId = _a.outletId, viewContainerRef = _a.viewContainerRef, injector = _a.injector, context = _a.context, content = _a.content;
        var hostContainerRef = outletId != null ? this.portalOutletRegistry.getTarget(outletId) : viewContainerRef;
        return this.componentResolverService.getComponentFactory(componentId)
            .pipe(map(function (_a) {
            var _b = __read(_a, 2), componentFactory = _b[0], moduleInjector = _b[1];
            var injectionTokens = new WeakMap([
                [PORTAL_CONTEXT_DATA, context]
            ]);
            var portalInjector = new PortalInjector(injector !== null && injector !== void 0 ? injector : moduleInjector, injectionTokens);
            var componentRef = componentFactory.create(portalInjector, content);
            hostContainerRef.clear();
            hostContainerRef.insert(componentRef.hostView);
            componentRef.changeDetectorRef.markForCheck();
            return componentRef;
        }));
    };
    PortalService.ctorParameters = function () { return [
        { type: ComponentResolverService },
        { type: PortalOutletRegistry }
    ]; };
    PortalService.ɵprov = ɵɵdefineInjectable({ factory: function PortalService_Factory() { return new PortalService(ɵɵinject(ComponentResolverService), ɵɵinject(PortalOutletRegistry)); }, token: PortalService, providedIn: "root" });
    PortalService = __decorate([
        Injectable({ providedIn: 'root' }),
        __metadata("design:paramtypes", [ComponentResolverService,
            PortalOutletRegistry])
    ], PortalService);
    return PortalService;
}());

var ComponentPortalDirective = /** @class */ (function () {
    function ComponentPortalDirective(portalService, viewContainerRef) {
        var _this = this;
        this.portalService = portalService;
        this.viewContainerRef = viewContainerRef;
        this._componentId$ = new Subject();
        this.activated = new EventEmitter();
        this.deactivated = new EventEmitter();
        this._subscription = this._componentId$
            .pipe(tap(function () { return _this.destroyComponent(); }), switchMap(function (componentId) {
            return _this.portalService.createComponent({
                componentId: componentId,
                viewContainerRef: viewContainerRef,
                outletId: _this.attachTo,
                context: _this.context,
                content: _this.content
            });
        }))
            .subscribe(function (componentRef) {
            _this._componentRef = componentRef;
            _this.activated.emit(_this._componentRef);
            _this._componentRef.changeDetectorRef.markForCheck();
        });
    }
    ComponentPortalDirective.prototype.ngOnChanges = function (changes) {
        if (changes.componentId != null) {
            this._componentId$.next(changes.componentId.currentValue);
        }
    };
    ComponentPortalDirective.prototype.ngOnDestroy = function () {
        this._subscription.unsubscribe();
        this.destroyComponent();
    };
    ComponentPortalDirective.prototype.destroyComponent = function () {
        if (this._componentRef) {
            this.deactivated.emit(this._componentRef);
            this.viewContainerRef.clear();
            this._componentRef.destroy();
            this._componentRef = null;
        }
    };
    ComponentPortalDirective.ctorParameters = function () { return [
        { type: PortalService },
        { type: ViewContainerRef }
    ]; };
    __decorate([
        Input('ctsComponentPortal'),
        __metadata("design:type", String)
    ], ComponentPortalDirective.prototype, "componentId", void 0);
    __decorate([
        Input('ctsComponentPortalAttachTo'),
        __metadata("design:type", String)
    ], ComponentPortalDirective.prototype, "attachTo", void 0);
    __decorate([
        Input('ctsComponentPortalContext'),
        __metadata("design:type", Object)
    ], ComponentPortalDirective.prototype, "context", void 0);
    __decorate([
        Input('ctsComponentPortalContent'),
        __metadata("design:type", Array)
    ], ComponentPortalDirective.prototype, "content", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ComponentPortalDirective.prototype, "activated", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ComponentPortalDirective.prototype, "deactivated", void 0);
    ComponentPortalDirective = __decorate([
        Directive({
            selector: '[ctsComponentPortal]',
            exportAs: 'ctsComponentPortal'
        }),
        __metadata("design:paramtypes", [PortalService,
            ViewContainerRef])
    ], ComponentPortalDirective);
    return ComponentPortalDirective;
}());

var PortalOutletDirective = /** @class */ (function () {
    function PortalOutletDirective(portalOutletRegistry, viewContainer) {
        this.portalOutletRegistry = portalOutletRegistry;
        this.viewContainer = viewContainer;
    }
    PortalOutletDirective.prototype.ngOnInit = function () {
        this.portalOutletRegistry.register(this.outletId, this.viewContainer);
    };
    PortalOutletDirective.prototype.ngOnDestroy = function () {
        this.portalOutletRegistry.remove(this.outletId);
    };
    PortalOutletDirective.ctorParameters = function () { return [
        { type: PortalOutletRegistry },
        { type: ViewContainerRef }
    ]; };
    __decorate([
        Input('ctsPortalOutlet'),
        __metadata("design:type", String)
    ], PortalOutletDirective.prototype, "outletId", void 0);
    PortalOutletDirective = __decorate([
        Directive({
            selector: '[ctsPortalOutlet]'
        }),
        __metadata("design:paramtypes", [PortalOutletRegistry,
            ViewContainerRef])
    ], PortalOutletDirective);
    return PortalOutletDirective;
}());

var CtsPortalsModule = /** @class */ (function () {
    function CtsPortalsModule() {
    }
    CtsPortalsModule = __decorate([
        NgModule({
            imports: [CommonModule],
            declarations: [
                PortalModuleDirective,
                ComponentPortalDirective,
                PortalOutletDirective
            ],
            providers: [
                // Might drop support for old magic string implementation
                {
                    provide: NgModuleFactoryLoader,
                    useClass: SystemJsNgModuleLoader
                }
            ],
            exports: [
                PortalModuleDirective,
                ComponentPortalDirective,
                PortalOutletDirective
            ]
        })
    ], CtsPortalsModule);
    return CtsPortalsModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { ComponentPortalDirective, ComponentPortalRegistry, CtsPortalsModule, PORTAL_COMPONENTS_TOKEN, PORTAL_CONTEXT_DATA, PORTAL_MODULE_TOKEN, PortalModuleDirective, PortalModuleRegistry, PortalOutletDirective, PortalOutletRegistry, PortalService, ComponentResolverService as ɵa };
//# sourceMappingURL=codethatstack-portals.js.map
