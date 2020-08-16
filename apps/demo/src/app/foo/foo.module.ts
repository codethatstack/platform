
import { NgModule, NgModuleRef } from '@angular/core';
import { FooComponent } from './foo.component';
import { ComponentPortalRegistry, ComponentRegistryItem } from '@codethatstack/portals';

const FOO_COMPONENTS: ComponentRegistryItem[] = [
  {
    componentId: 'FooComponent',
    componentType: FooComponent
  }
];

@NgModule({
  imports: [],
  declarations: [FooComponent],
})
export class FooModule {
  constructor(componentRegistry: ComponentPortalRegistry, moduleRef: NgModuleRef<FooModule>) {
    componentRegistry.register('FooModule', FOO_COMPONENTS, moduleRef);
  }
}
