(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('@codethatstack/portals', ['exports', '@angular/core', '@angular/common', 'rxjs', 'rxjs/operators'], factory) :
    (global = global || self, factory((global.codethatstack = global.codethatstack || {}, global.codethatstack.portals = {}), global.ng.core, global.ng.common, global.rxjs, global.rxjs.operators));
}(this, (function (exports, core, common, rxjs, operators) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __createBinding(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
    }

    function __exportStar(m, exports) {
        for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }

    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    var PORTAL_MODULE_TOKEN = new core.InjectionToken('Portal Modules');
    var PORTAL_COMPONENTS_TOKEN = new core.InjectionToken('Portal Components');
    var PORTAL_CONTEXT_DATA = new core.InjectionToken('Portal Context Data');

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
            return new rxjs.Observable(function (subscriber) {
                if (moduleDef instanceof core.NgModuleRef) {
                    subscriber.next(moduleDef);
                    subscriber.complete();
                    return;
                }
                var moduleId = _this.getModuleId(moduleDef);
                var moduleReference = _this._cache.get(moduleId);
                if (moduleReference != null) {
                    if (rxjs.isObservable(moduleReference)) {
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
                    loader$ = rxjs.from(registryValue.load())
                        .pipe(operators.switchMap(function (moduleOrFactory) {
                        if (moduleOrFactory instanceof core.NgModuleFactory) {
                            return rxjs.of(moduleOrFactory);
                        }
                        return rxjs.from(_this.compiler.compileModuleAsync(moduleOrFactory));
                    }));
                }
                else {
                    /** Deprecated */
                    var pathAndModule = moduleDef['path'] + "#" + moduleDef['name'];
                    loader$ = rxjs.from(_this.moduleLoader.load(pathAndModule));
                }
                var factory$ = loader$.pipe(operators.map(function (factory) { return factory.create(localInjector || _this.injector); }), operators.tap(function (ngModuleRef) { return _this._cache.set(moduleId, ngModuleRef); }));
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
            { type: Array, decorators: [{ type: core.Optional }, { type: core.Inject, args: [PORTAL_MODULE_TOKEN,] }] },
            { type: core.Injector },
            { type: core.Compiler },
            { type: core.NgModuleFactoryLoader, decorators: [{ type: core.Optional }] }
        ]; };
        PortalModuleRegistry.ɵprov = core.ɵɵdefineInjectable({ factory: function PortalModuleRegistry_Factory() { return new PortalModuleRegistry(core.ɵɵinject(PORTAL_MODULE_TOKEN, 8), core.ɵɵinject(core.INJECTOR), core.ɵɵinject(core.Compiler), core.ɵɵinject(core.NgModuleFactoryLoader, 8)); }, token: PortalModuleRegistry, providedIn: "root" });
        PortalModuleRegistry = __decorate([
            core.Injectable({ providedIn: 'root' }),
            __param(0, core.Optional()), __param(0, core.Inject(PORTAL_MODULE_TOKEN)),
            __param(3, core.Optional()),
            __metadata("design:paramtypes", [Array, core.Injector,
                core.Compiler,
                core.NgModuleFactoryLoader])
        ], PortalModuleRegistry);
        return PortalModuleRegistry;
    }());

    var PortalModuleDirective = /** @class */ (function () {
        function PortalModuleDirective(portalModuleRegistry) {
            this.portalModuleRegistry = portalModuleRegistry;
            this.isLoaded = false;
            this._errorLoading = false;
            this.loaded = new core.EventEmitter();
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
            core.Input('ctsPortalModule'),
            __metadata("design:type", String)
        ], PortalModuleDirective.prototype, "moduleId", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], PortalModuleDirective.prototype, "loaded", void 0);
        __decorate([
            core.HostListener('mouseenter'),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], PortalModuleDirective.prototype, "onMouseEnter", null);
        PortalModuleDirective = __decorate([
            core.Directive({
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
            { type: Array, decorators: [{ type: core.Optional }, { type: core.Inject, args: [PORTAL_COMPONENTS_TOKEN,] }] }
        ]; };
        ComponentPortalRegistry.ɵprov = core.ɵɵdefineInjectable({ factory: function ComponentPortalRegistry_Factory() { return new ComponentPortalRegistry(core.ɵɵinject(PORTAL_COMPONENTS_TOKEN, 8)); }, token: ComponentPortalRegistry, providedIn: "root" });
        ComponentPortalRegistry = __decorate([
            core.Injectable({ providedIn: 'root' }),
            __param(0, core.Optional()), __param(0, core.Inject(PORTAL_COMPONENTS_TOKEN)),
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
            return new rxjs.Observable(function (subscriber) {
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
        ComponentResolverService.ɵprov = core.ɵɵdefineInjectable({ factory: function ComponentResolverService_Factory() { return new ComponentResolverService(core.ɵɵinject(PortalModuleRegistry), core.ɵɵinject(ComponentPortalRegistry)); }, token: ComponentResolverService, providedIn: "root" });
        ComponentResolverService = __decorate([
            core.Injectable({ providedIn: 'root' }),
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
        PortalOutletRegistry.ɵprov = core.ɵɵdefineInjectable({ factory: function PortalOutletRegistry_Factory() { return new PortalOutletRegistry(); }, token: PortalOutletRegistry, providedIn: "root" });
        PortalOutletRegistry = __decorate([
            core.Injectable({ providedIn: 'root' })
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
                .pipe(operators.map(function (_a) {
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
        PortalService.ɵprov = core.ɵɵdefineInjectable({ factory: function PortalService_Factory() { return new PortalService(core.ɵɵinject(ComponentResolverService), core.ɵɵinject(PortalOutletRegistry)); }, token: PortalService, providedIn: "root" });
        PortalService = __decorate([
            core.Injectable({ providedIn: 'root' }),
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
            this._componentId$ = new rxjs.Subject();
            this.activated = new core.EventEmitter();
            this.deactivated = new core.EventEmitter();
            this._subscription = this._componentId$
                .pipe(operators.tap(function () { return _this.destroyComponent(); }), operators.switchMap(function (componentId) {
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
            { type: core.ViewContainerRef }
        ]; };
        __decorate([
            core.Input('ctsComponentPortal'),
            __metadata("design:type", String)
        ], ComponentPortalDirective.prototype, "componentId", void 0);
        __decorate([
            core.Input('ctsComponentPortalAttachTo'),
            __metadata("design:type", String)
        ], ComponentPortalDirective.prototype, "attachTo", void 0);
        __decorate([
            core.Input('ctsComponentPortalContext'),
            __metadata("design:type", Object)
        ], ComponentPortalDirective.prototype, "context", void 0);
        __decorate([
            core.Input('ctsComponentPortalContent'),
            __metadata("design:type", Array)
        ], ComponentPortalDirective.prototype, "content", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], ComponentPortalDirective.prototype, "activated", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], ComponentPortalDirective.prototype, "deactivated", void 0);
        ComponentPortalDirective = __decorate([
            core.Directive({
                selector: '[ctsComponentPortal]',
                exportAs: 'ctsComponentPortal'
            }),
            __metadata("design:paramtypes", [PortalService,
                core.ViewContainerRef])
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
            { type: core.ViewContainerRef }
        ]; };
        __decorate([
            core.Input('ctsPortalOutlet'),
            __metadata("design:type", String)
        ], PortalOutletDirective.prototype, "outletId", void 0);
        PortalOutletDirective = __decorate([
            core.Directive({
                selector: '[ctsPortalOutlet]'
            }),
            __metadata("design:paramtypes", [PortalOutletRegistry,
                core.ViewContainerRef])
        ], PortalOutletDirective);
        return PortalOutletDirective;
    }());

    var CtsPortalsModule = /** @class */ (function () {
        function CtsPortalsModule() {
        }
        CtsPortalsModule = __decorate([
            core.NgModule({
                imports: [common.CommonModule],
                declarations: [
                    PortalModuleDirective,
                    ComponentPortalDirective,
                    PortalOutletDirective
                ],
                providers: [
                    // Might drop support for old magic string implementation
                    {
                        provide: core.NgModuleFactoryLoader,
                        useClass: core.SystemJsNgModuleLoader
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

    exports.ComponentPortalDirective = ComponentPortalDirective;
    exports.ComponentPortalRegistry = ComponentPortalRegistry;
    exports.CtsPortalsModule = CtsPortalsModule;
    exports.PORTAL_COMPONENTS_TOKEN = PORTAL_COMPONENTS_TOKEN;
    exports.PORTAL_CONTEXT_DATA = PORTAL_CONTEXT_DATA;
    exports.PORTAL_MODULE_TOKEN = PORTAL_MODULE_TOKEN;
    exports.PortalModuleDirective = PortalModuleDirective;
    exports.PortalModuleRegistry = PortalModuleRegistry;
    exports.PortalOutletDirective = PortalOutletDirective;
    exports.PortalOutletRegistry = PortalOutletRegistry;
    exports.PortalService = PortalService;
    exports.ɵa = ComponentResolverService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=codethatstack-portals.umd.js.map
