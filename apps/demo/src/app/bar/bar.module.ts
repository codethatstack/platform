
import { NgModule, NgModuleRef } from '@angular/core';
import { BarComponent } from './bar.component';
import { ComponentPortalRegistry, ComponentRegistryItem } from '@codethatstack/portals';

const BAR_COMPONENTS: ComponentRegistryItem[] = [
  {
    componentId: 'BarComponent',
    componentType: BarComponent
  }
];

@NgModule({
  imports: [],
  declarations: [BarComponent],
})
export class BarModule {
  constructor(componentRegistry: ComponentPortalRegistry, moduleRef: NgModuleRef<BarModule>) {
    componentRegistry.register('BarModule', BAR_COMPONENTS, moduleRef);
  }
}
