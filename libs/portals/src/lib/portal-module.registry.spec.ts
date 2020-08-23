import { PortalModuleRegistry } from "./portal-module.registry";
import { ModuleLoaderDef } from './portal-types';
import { TestBed, fakeAsync } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { NgModule, Compiler, Injector } from '@angular/core';

describe('AppComponent', () => {

  const dummyModuleDef: ModuleLoaderDef[] = [
    {
      moduleId: 'Foo',
      load: () => new Promise<any>((resolve) => {
        resolve(TestModule);
      })
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [TestModule]});
  });

  it('Should allow construct with null parameters', () => {
    const moduleRegistry = new PortalModuleRegistry(null, null, null);
    expect(moduleRegistry).toBeDefined();
  });

  it('Should allow registering using ModuleLoaderDef', () => {
    const moduleRegistry = new PortalModuleRegistry(dummyModuleDef, null, null);
    expect(moduleRegistry.exists('Foo')).toEqual(true);
  });

  it('Should register using register method', () => {
    const moduleRegistry = new PortalModuleRegistry(null, null, null);
    moduleRegistry.register(dummyModuleDef);
    expect(moduleRegistry.exists('Foo')).toBeTruthy();
  });

  it('Should register and module not exist', () => {
    const moduleRegistry = new PortalModuleRegistry(null, null, null);
    moduleRegistry.register(dummyModuleDef);
    expect(moduleRegistry.exists('Bar')).toBeFalsy();
  });

  it('Should load Module', fakeAsync(() => {
    const compiler = TestBed.inject(Compiler);
    const injector = Injector.create({ providers: [] });
    const moduleRegistry = new PortalModuleRegistry(dummyModuleDef, injector, compiler);

    moduleRegistry.getOrLoad('Foo')
      .subscribe(response => {
        console.log('Load', response);
        expect(response).toBeDefined();
        expect(response.instance).toBeInstanceOf(TestModule);

        const cache = (moduleRegistry as any)._cache as Map<string, any>;
        expect(cache.size).toEqual(1);
        expect(cache.has('Foo')).toBeDefined();
        expect(cache.get('Foo').instance).toBeInstanceOf(TestModule);
      });

  }));

  it('Should not load Module and return error', fakeAsync(() => {
    const compiler = TestBed.inject(Compiler);
    const injector = Injector.create({ providers: [] });
    const moduleRegistry = new PortalModuleRegistry(dummyModuleDef, injector, compiler);

    moduleRegistry.getOrLoad('Bar')
      .subscribe(response => {
        expect(response).toEqual(1);
      },
      error => {
        expect(error).toContain('No NgModule module loader specified for Bar');
        const cache = (moduleRegistry as any)._cache as Map<string, any>;
        expect(cache.size).toEqual(0);
      });
  }));

});

@NgModule({
  imports: [CommonModule],
  declarations: [],
  exports: [],
})
export class TestModule { }