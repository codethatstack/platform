# Portals

Component Portals provides the ability to lazily load a NgModule and instantiate any component contained within any module without a direct reference to the component's underlying type.

# Getting Started


## Step 1: Install

``` npm install @codethatstack/portals --save```

## Step 2: Import CtsPortalModule

Import CtsPortalModule in the root application NgModule.

```typescript
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CtsPortalsModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## Step 3: Register Portal Modules

Define a module identifier (moduleId) for each NgModule that will be lazy loaded. This uses same syntax as lazy loading child routes.

```typescript
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
```

## Step 4: Register Portal Components

Define each component via a string value that will be lazy loaded, referencing the moduleId as above.

```typescript
const PortalComponents: ComponentRegistryItem[] = [
  {
    componentId: 'FooComponent', // <- Component name as a string value
    moduleId: 'Foo' // <- References the Module declared in Step 3
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

```

## Step 5: Load Portal Configuration

Register both the Portal Modules and Portal Components using the Injection Tokens.

```typescript
@NgModule({
  ...
  providers: [
    {
      provide: PORTAL_MODULE_TOKEN,
      useValue: PortalModules // <- Reference from Step 3
    },
    {
      provide: PORTAL_COMPONENTS_TOKEN,
      useValue: PortalComponents // <- Reference from Step 4
    }
  ],
  ...
})
export class AppModule {}
```

## Step 6: Register ComponentType with Portal

Register the concrete Component Type to the Portal. The componentId needs to reference the string value provided when initializing Portals.

```typescript
const BAR_COMPONENTS: ComponentRegistryItem[] = [
  {
    componentId: 'BarComponent', // <- Component identifier in Step 3
    componentType: BarComponent  // <- Concrete Component Type that will be instantiate given string value.
  }
];

@NgModule({
  imports: [],
  declarations: [BarComponent], // <- Concrete Component Type referenced above
  //entryComponents: [BarComponent] // <- required for pre-Ivy
})
export class BarModule {
  constructor(componentRegistry: ComponentPortalRegistry, moduleRef: NgModuleRef<BarModule>) {
    componentRegistry.register('BarModule', BAR_COMPONENTS, moduleRef); // <- The glue here
  }
}

```

## Step 7: Use Component Portal

Create the component using the string value with direct reference to the Component Type.

```html
  <ng-container
    [ctsComponentPortal]="'BarComponent'"
    (activated)="onActivated($event)"
    (deactivated)="onDeactivated($event)">
  </ng-container>
```

Can also pass in a context to the component, the same as passing context to Material Dialog.

```html
  <ng-container
    [ctsComponentPortal]="'BarComponent'"
    [ctsComponentPortalContext]="{ myStringValue: 'Some value' }"
    (activated)="onActivated($event)"
    (deactivated)="onDeactivated($event)">
  </ng-container>
```

Reference the context using the injection token ```PORTAL_CONTEXT_DATA```

```typescript
export class BarComponent implements OnInit {

  constructor(
    @Optional() @Inject(PORTAL_CONTEXT_DATA) private context: any) { // <- ctsComponentPortalContext value

  }

```

## Define a Portal Outlet

Portal Outlets provide the ability to attach a component portal anywhere in the DOM hierachy inside the application.

Register a portal outlet using the directive ```ctsPortalOutlet```.

```html
  <div ctsPortalOutlet="drawer"></div> <!-- Name the portal outlet ->
```

The Input property ```ctsComponentPortalAttachTo``` defines the portal the component will be attached to. By default  the component will attached to the current ViewContainerRef.

```html
  <ng-container
    [ctsComponentPortal]="'BarComponent'"
    [ctsComponentPortalContext]="{ myStringValue: 'Some value' }"
    [ctsComponentPortalAttachTo]="'drawer'"
    (activated)="onActivated($event)"
    (deactivated)="onDeactivated($event)">
  </ng-container>
```

## Eager loading of NgModule

Eagerly load the NgModule on hover of some element to reduce lazy component loading time.

```html
  <div #fooLazy="ctsPortalModule"
    [ctsPortalModule]="'Foo'"
    (loaded)="onModuleLoaded('Foo')"
    [class.loaded]="fooLazy.isLoaded">
    Hover over to Load FooModule
  </div>

```
