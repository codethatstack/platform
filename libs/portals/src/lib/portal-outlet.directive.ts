import {Directive, Input, OnInit, ViewContainerRef, OnDestroy} from '@angular/core';
import { PortalOutletRegistry } from './portal-outlet.registry';

@Directive({
  selector: '[ctsPortalOutlet]'
})
export class PortalOutletDirective implements OnInit, OnDestroy {

  @Input('ctsPortalOutlet') outletId: string;

  constructor(
      private portalOutletRegistry: PortalOutletRegistry,
      private viewContainer: ViewContainerRef) { }

  ngOnInit(): void {
    this.portalOutletRegistry.register(this.outletId, this.viewContainer);
  }

  ngOnDestroy(): void {
    this.portalOutletRegistry.remove(this.outletId);
  }

}
