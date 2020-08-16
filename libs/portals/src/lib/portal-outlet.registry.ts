import {Injectable, ViewContainerRef} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PortalOutletRegistry {

  private _targets: Map<string, ViewContainerRef> = new Map<string, ViewContainerRef>();

  register(outletId: string, viewContainer: ViewContainerRef): void {
    this._targets.set(outletId, viewContainer);
  }

  remove(outletId: string): void {
    this._targets.delete(outletId);
  }

  getTarget(outletId: string): ViewContainerRef | null {
    return this._targets.has(outletId)
      ? this._targets.get(outletId)
      : null;
  }

}
