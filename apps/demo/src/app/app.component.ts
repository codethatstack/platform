import { Component, ComponentRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'demo';
  componentId: string;

  onModuleLoaded(moduleId: string): void {
    console.log(`Module ${moduleId} Loaded`);
  }

  onActivated(args: ComponentRef<any>): void {
    console.log('Component Activated', args);
  }

  onDeactivated(args: ComponentRef<any>): void {
    console.log('Component Deactivated', args);
  }
}
