import { __decorate, __param, __metadata } from 'tslib';
import { InjectionToken, NgModuleRef, NgModuleFactory, Optional, Inject, Injector, Compiler, NgModuleFactoryLoader, ɵɵdefineInjectable, ɵɵinject, INJECTOR, Injectable, EventEmitter, Input, Output, HostListener, Directive, ViewContainerRef, NgModule, SystemJsNgModuleLoader } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, isObservable, from, of, Subject } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';

const PORTAL_MODULE_TOKEN = new InjectionToken('Portal Modules');
const PORTAL_COMPONENTS_TOKEN = new InjectionToken('Portal Components');
const PORTAL_CONTEXT_DATA = new InjectionToken('Portal Context Data');

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
PortalModuleRegistry.ɵprov = ɵɵdefineInjectable({ factory: function PortalModuleRegistry_Factory() { return new PortalModuleRegistry(ɵɵinject(PORTAL_MODULE_TOKEN, 8), ɵɵinject(INJECTOR), ɵɵinject(Compiler), ɵɵinject(NgModuleFactoryLoader, 8)); }, token: PortalModuleRegistry, providedIn: "root" });
PortalModuleRegistry = __decorate([
    Injectable({ providedIn: 'root' }),
    __param(0, Optional()), __param(0, Inject(PORTAL_MODULE_TOKEN)),
    __param(3, Optional()),
    __metadata("design:paramtypes", [Array, Injector,
        Compiler,
        NgModuleFactoryLoader])
], PortalModuleRegistry);

let PortalModuleDirective = class PortalModuleDirective {
    constructor(portalModuleRegistry) {
        this.portalModuleRegistry = portalModuleRegistry;
        this.isLoaded = false;
        this._errorLoading = false;
        this.loaded = new EventEmitter();
    }
    onMouseEnter() {
        if (!this.isLoaded && !this._errorLoading && this.moduleId != null && this._loading == null) {
            // Only need to load first time mouse enters
            this._loading = this.portalModuleRegistry.getOrLoad(this.moduleId)
                .subscribe(module => {
                this.isLoaded = true;
                this.loaded.emit(module);
            }, err => { this._errorLoading = true; });
        }
    }
};
PortalModuleDirective.ctorParameters = () => [
    { type: PortalModuleRegistry }
];
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

let ComponentPortalRegistry = class ComponentPortalRegistry {
    constructor(lazyComponents) {
        this._registry = new Map();
        this._modules = new Map();
        this.registerComponents(lazyComponents);
    }
    register(moduleId, values, moduleRef) {
        if (!this._modules.has(moduleId)) {
            this._modules.set(moduleId, values);
        }
        this.registerComponents(values, moduleRef);
    }
    get(componentId) {
        return this._registry.get(componentId);
    }
    registerComponents(values, moduleRef) {
        if (values == null)
            return;
        values.forEach(item => {
            this._registry.set(item.componentId, Object.assign(Object.assign({}, item), { module: moduleRef }));
        });
    }
};
ComponentPortalRegistry.ctorParameters = () => [
    { type: Array, decorators: [{ type: Optional }, { type: Inject, args: [PORTAL_COMPONENTS_TOKEN,] }] }
];
ComponentPortalRegistry.ɵprov = ɵɵdefineInjectable({ factory: function ComponentPortalRegistry_Factory() { return new ComponentPortalRegistry(ɵɵinject(PORTAL_COMPONENTS_TOKEN, 8)); }, token: ComponentPortalRegistry, providedIn: "root" });
ComponentPortalRegistry = __decorate([
    Injectable({ providedIn: 'root' }),
    __param(0, Optional()), __param(0, Inject(PORTAL_COMPONENTS_TOKEN)),
    __metadata("design:paramtypes", [Array])
], ComponentPortalRegistry);

let ComponentResolverService = class ComponentResolverService {
    constructor(moduleRegistry, componentRegistry) {
        this.moduleRegistry = moduleRegistry;
        this.componentRegistry = componentRegistry;
    }
    getComponentFactory(componentId) {
        return new Observable(subscriber => {
            let componentRegItem = this.componentRegistry.get(componentId);
            if (componentRegItem == null) {
                subscriber.error(`ComponentId ${componentId} is not registered`);
            }
            if (componentRegItem.moduleId == null && componentRegItem.module == null) {
                subscriber.error(`Module for ${componentId} is not defined`);
            }
            const factoryResolver = (moduleRef, componentType) => {
                const componentFactory = moduleRef.componentFactoryResolver.resolveComponentFactory(componentType);
                subscriber.next([componentFactory, moduleRef.injector]);
                subscriber.complete();
            };
            if (componentRegItem.module != null) {
                factoryResolver(componentRegItem.module, componentRegItem.componentType);
            }
            else {
                this.moduleRegistry.getOrLoad(componentRegItem.moduleId)
                    .subscribe(moduleRef => {
                    if (componentRegItem.componentType == null) {
                        componentRegItem = this.componentRegistry.get(componentId); // Retrieve entry again after module has been loaded.
                        if (componentRegItem.componentType == null) {
                            throw new Error(`Component ${componentId} type has not been registered`);
                        }
                    }
                    factoryResolver(moduleRef, componentRegItem.componentType);
                });
            }
        });
    }
};
ComponentResolverService.ctorParameters = () => [
    { type: PortalModuleRegistry },
    { type: ComponentPortalRegistry }
];
ComponentResolverService.ɵprov = ɵɵdefineInjectable({ factory: function ComponentResolverService_Factory() { return new ComponentResolverService(ɵɵinject(PortalModuleRegistry), ɵɵinject(ComponentPortalRegistry)); }, token: ComponentResolverService, providedIn: "root" });
ComponentResolverService = __decorate([
    Injectable({ providedIn: 'root' }),
    __metadata("design:paramtypes", [PortalModuleRegistry,
        ComponentPortalRegistry])
], ComponentResolverService);

let PortalOutletRegistry = class PortalOutletRegistry {
    constructor() {
        this._targets = new Map();
    }
    register(outletId, viewContainer) {
        this._targets.set(outletId, viewContainer);
    }
    remove(outletId) {
        this._targets.delete(outletId);
    }
    getTarget(outletId) {
        return this._targets.has(outletId)
            ? this._targets.get(outletId)
            : null;
    }
};
PortalOutletRegistry.ɵprov = ɵɵdefineInjectable({ factory: function PortalOutletRegistry_Factory() { return new PortalOutletRegistry(); }, token: PortalOutletRegistry, providedIn: "root" });
PortalOutletRegistry = __decorate([
    Injectable({ providedIn: 'root' })
], PortalOutletRegistry);

class PortalInjector {
    constructor(_parentInjector, _customTokens) {
        this._parentInjector = _parentInjector;
        this._customTokens = _customTokens;
    }
    get(token, notFoundValue) {
        const value = this._customTokens.get(token);
        if (typeof value !== 'undefined') {
            return value;
        }
        return this._parentInjector.get(token, notFoundValue);
    }
}

let PortalService = class PortalService {
    constructor(componentResolverService, portalOutletRegistry) {
        this.componentResolverService = componentResolverService;
        this.portalOutletRegistry = portalOutletRegistry;
    }
    createComponent({ componentId, outletId, viewContainerRef, injector, context, content }) {
        const hostContainerRef = outletId != null ? this.portalOutletRegistry.getTarget(outletId) : viewContainerRef;
        return this.componentResolverService.getComponentFactory(componentId)
            .pipe(map(([componentFactory, moduleInjector]) => {
            const injectionTokens = new WeakMap([
                [PORTAL_CONTEXT_DATA, context]
            ]);
            const portalInjector = new PortalInjector(injector !== null && injector !== void 0 ? injector : moduleInjector, injectionTokens);
            const componentRef = componentFactory.create(portalInjector, content);
            hostContainerRef.clear();
            hostContainerRef.insert(componentRef.hostView);
            componentRef.changeDetectorRef.markForCheck();
            return componentRef;
        }));
    }
};
PortalService.ctorParameters = () => [
    { type: ComponentResolverService },
    { type: PortalOutletRegistry }
];
PortalService.ɵprov = ɵɵdefineInjectable({ factory: function PortalService_Factory() { return new PortalService(ɵɵinject(ComponentResolverService), ɵɵinject(PortalOutletRegistry)); }, token: PortalService, providedIn: "root" });
PortalService = __decorate([
    Injectable({ providedIn: 'root' }),
    __metadata("design:paramtypes", [ComponentResolverService,
        PortalOutletRegistry])
], PortalService);

let ComponentPortalDirective = class ComponentPortalDirective {
    constructor(portalService, viewContainerRef) {
        this.portalService = portalService;
        this.viewContainerRef = viewContainerRef;
        this._componentId$ = new Subject();
        this.activated = new EventEmitter();
        this.deactivated = new EventEmitter();
        this._subscription = this._componentId$
            .pipe(tap(() => this.destroyComponent()), switchMap(componentId => {
            return this.portalService.createComponent({
                componentId,
                viewContainerRef,
                outletId: this.attachTo,
                context: this.context,
                content: this.content
            });
        }))
            .subscribe(componentRef => {
            this._componentRef = componentRef;
            this.activated.emit(this._componentRef);
            this._componentRef.changeDetectorRef.markForCheck();
        });
    }
    ngOnChanges(changes) {
        if (changes.componentId != null) {
            this._componentId$.next(changes.componentId.currentValue);
        }
    }
    ngOnDestroy() {
        this._subscription.unsubscribe();
        this.destroyComponent();
    }
    destroyComponent() {
        if (this._componentRef) {
            this.deactivated.emit(this._componentRef);
            this.viewContainerRef.clear();
            this._componentRef.destroy();
            this._componentRef = null;
        }
    }
};
ComponentPortalDirective.ctorParameters = () => [
    { type: PortalService },
    { type: ViewContainerRef }
];
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

let PortalOutletDirective = class PortalOutletDirective {
    constructor(portalOutletRegistry, viewContainer) {
        this.portalOutletRegistry = portalOutletRegistry;
        this.viewContainer = viewContainer;
    }
    ngOnInit() {
        this.portalOutletRegistry.register(this.outletId, this.viewContainer);
    }
    ngOnDestroy() {
        this.portalOutletRegistry.remove(this.outletId);
    }
};
PortalOutletDirective.ctorParameters = () => [
    { type: PortalOutletRegistry },
    { type: ViewContainerRef }
];
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

let CtsPortalsModule = class CtsPortalsModule {
};
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

/**
 * Generated bundle index. Do not edit.
 */

export { ComponentPortalDirective, ComponentPortalRegistry, CtsPortalsModule, PORTAL_COMPONENTS_TOKEN, PORTAL_CONTEXT_DATA, PORTAL_MODULE_TOKEN, PortalModuleDirective, PortalModuleRegistry, PortalOutletDirective, PortalOutletRegistry, PortalService, ComponentResolverService as ɵa };
//# sourceMappingURL=codethatstack-portals.js.map
