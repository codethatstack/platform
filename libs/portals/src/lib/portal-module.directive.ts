import { Directive, Input, HostListener, Output, EventEmitter, NgModuleRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { PortalModuleRegistry } from './portal-module.registry';

@Directive({
  selector: '[ctsPortalModule]',
  exportAs: 'ctsPortalModule'
})
export class PortalModuleDirective {

  public isLoaded = false;
  private _errorLoading = false;
  private _loading: Subscription;

  @Input('ctsPortalModule') moduleId: string;
  @Output() loaded = new EventEmitter<NgModuleRef<any>>();

  constructor(private portalModuleRegistry: PortalModuleRegistry) { }

  @HostListener('mouseenter')
  onMouseEnter() {
    if (!this.isLoaded && !this._errorLoading && this.moduleId != null && this._loading == null) {
      // Only need to load first time mouse enters
      this._loading = this.portalModuleRegistry.getOrLoad(this.moduleId)
        .subscribe(
          module => {
            this.isLoaded = true;
            this.loaded.emit(module);
          },
          err => { this._errorLoading = true }
        );
    }
  }

}