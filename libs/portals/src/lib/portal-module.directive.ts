import { Directive, Input, HostListener, Output, EventEmitter } from '@angular/core';
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
  @Output() loaded = new EventEmitter<void>();

  constructor(private lazyModuleRegistry: PortalModuleRegistry) { }

  @HostListener('mouseenter')
  onMouseEnter() {
    if (!this.isLoaded && !this._errorLoading && this.moduleId != null && this._loading == null) {
      // Only need to load first time mouse enters
      this._loading = this.lazyModuleRegistry.getOrLoad(this.moduleId)
        .subscribe(
          module => {
            this.isLoaded = true;
            this.loaded.emit();
          },
          err => { this._errorLoading = true }
        );
    }
  }

}