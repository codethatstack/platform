import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CtsPortalsModule, ModuleLoaderDef, PORTAL_MODULE_TOKEN, ComponentRegistryItem, PORTAL_COMPONENTS_TOKEN } from '@codethatstack/portals';
import { AppComponent } from './app.component';

const PortalModules: ModuleLoaderDef[] = [
  {
    moduleId: 'Foo',
    load: () => import('./foo/foo.module').then(m => m.FooModule)
  },
  {
    moduleId: 'Bar',
    load: () => import('./bar/bar.module').then(m => m.BarModule)
  },
  {
    moduleId: 'Baz',
    load: () => import('./baz/baz.module').then(m => m.BazModule)
  }
];

const PortalComponents: ComponentRegistryItem[] = [
  {
    componentId: 'FooComponent',
    moduleId: 'Foo'
  },
  {
    componentId: 'BarComponent',
    moduleId: 'Bar'
  },
  {
    componentId: 'BazComponent',
    moduleId: 'Baz'
  }
];


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CtsPortalsModule],
  providers: [
    {
      provide: PORTAL_MODULE_TOKEN,
      useValue: PortalModules
    },
    {
      provide: PORTAL_COMPONENTS_TOKEN,
      useValue: PortalComponents
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
