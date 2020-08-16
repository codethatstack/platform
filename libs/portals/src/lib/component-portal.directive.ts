import { Directive, Input, ViewContainerRef, OnChanges, SimpleChanges, ComponentRef, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { PortalService } from './portal.service';

@Directive({
  selector: '[ctsComponentPortal]',
  exportAs: 'ctsComponentPortal'
})
export class ComponentPortalDirective implements OnChanges, OnDestroy {

  private _componentRef: ComponentRef<any>;
  private _componentId$ = new Subject<string>();
  private _subscription: Subscription;

  @Input('ctsComponentPortal') componentId: string;
  @Input('ctsComponentPortalAttachTo') attachTo: string;
  @Input('ctsComponentPortalContext') context: any;
  @Input('ctsComponentPortalContent') content: any[][];

  @Output() activated = new EventEmitter<ComponentRef<any>>();
  @Output() deactivated = new EventEmitter<ComponentRef<any>>();

  constructor(
    private portalService: PortalService,
    private viewContainerRef: ViewContainerRef) {

    this._subscription = this._componentId$
        .pipe(
          tap(() => this.destroyComponent()),
          switchMap(componentId => {
            return this.portalService.createComponent({
              componentId,
              viewContainerRef,
              outletId: this.attachTo,
              context: this.context,
              content: this.content
            });
          })
        )
        .subscribe(componentRef => {
          this._componentRef = componentRef;
          this.activated.emit(this._componentRef);
          this._componentRef.changeDetectorRef.markForCheck();
        });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.componentId != null) {
      this._componentId$.next(changes.componentId.currentValue);
    }
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
    this.destroyComponent();
  }

  private destroyComponent(): void {
    if (this._componentRef) {
      this.deactivated.emit(this._componentRef);
      this.viewContainerRef.clear();
      this._componentRef.destroy();
      this._componentRef = null;
    }
  }

}