
import { NgModule, NgModuleRef } from '@angular/core';
import { BazComponent } from './baz.component';
import { ComponentPortalRegistry, ComponentRegistryItem } from '@codethatstack/portals';

const BAZ_COMPONENTS: ComponentRegistryItem[] = [
  {
    componentId: 'BazComponent',
    componentType: BazComponent
  }
];

@NgModule({
  imports: [],
  declarations: [BazComponent],
})
export class BazModule {
  constructor(componentRegistry: ComponentPortalRegistry, moduleRef: NgModuleRef<BazModule>) {
    componentRegistry.register('BazModule', BAZ_COMPONENTS, moduleRef);
  }
}
