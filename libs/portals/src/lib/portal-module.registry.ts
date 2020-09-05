import { Injectable, NgModuleRef, Injector, Compiler, NgModuleFactoryLoader, NgModuleFactory, Optional, Inject } from '@angular/core';
import { Observable, isObservable, from, of } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';
import { ModuleLoaderDef, ModuleRegistryType, PORTAL_MODULE_TOKEN, PORTAL_MODULE_FACTORY_LOADER } from './portal-types';

@Injectable({ providedIn: 'root' })
export class PortalModuleRegistry {

  private _registry = new Map<string, ModuleLoaderDef>();
  private _cache = new Map<string, any>();
  private _compiler: Compiler;
  // tslint:disable-next-line: deprecation
  private _moduleLoader: NgModuleFactoryLoader

  constructor(
    @Optional() @Inject(PORTAL_MODULE_TOKEN) lazyModules: ModuleLoaderDef[],
    private injector: Injector) {

    if (lazyModules != null) {
      this.register(lazyModules);
    }
  }

  public register(moduleLoaderDefs: ModuleLoaderDef[]): void {
    moduleLoaderDefs.forEach(value => {
      this._registry.set(value.moduleId, value);
    });
  }

  public getOrLoad(moduleDef: ModuleRegistryType, localInjector?: Injector): Observable<NgModuleRef<any>> {
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
        } else {
          subscriber.next(moduleReference);
          subscriber.complete();
        }
        return;
      }

      let loader$: Observable<NgModuleFactory<any>>;

      if (typeof moduleDef === 'string') {

        const registryValue = this._registry.get(moduleDef);
        if (registryValue == null) {
          subscriber.error(`No NgModule module loader specified for ${moduleDef}`);
          return;
        }

        loader$ = from(registryValue.load())
          .pipe(
            switchMap(moduleOrFactory => {
              if (moduleOrFactory instanceof NgModuleFactory) {
                return of(moduleOrFactory);
              }
              return from(this.getCompiler().compileModuleAsync(moduleOrFactory));
            }),
          );

      } else {
        /** Deprecated */
        const pathAndModule = `${moduleDef['path']}#${moduleDef['name']}`;
        loader$ = from(this.getModuleLoader().load(pathAndModule));
      }

      const factory$ = loader$.pipe(
          map((factory: NgModuleFactory<any>) => factory.create(localInjector || this.injector)),
          tap(ngModuleRef => this._cache.set(moduleId, ngModuleRef)));

      this._cache.set(moduleId, factory$);
      factory$.subscribe(v => subscriber.next(v));
    });
  }

  private getModuleId(moduleDef: ModuleRegistryType): string {
    if (typeof moduleDef === 'string') {
      return moduleDef;
    }
    return moduleDef['moduleId'] ?? moduleDef['name'];
  }

  private getCompiler(): Compiler {
    if (this._compiler == null) {
      this._compiler = this.injector.get<Compiler>(Compiler);
    }
    return this._compiler;
  }

  // tslint:disable-next-line: deprecation
  private getModuleLoader(): NgModuleFactoryLoader {
    if (this._moduleLoader == null) {
      // tslint:disable-next-line: deprecation
      this._moduleLoader = this.injector.get<NgModuleFactoryLoader>(PORTAL_MODULE_FACTORY_LOADER);
    }
    return this._moduleLoader;
  }

}