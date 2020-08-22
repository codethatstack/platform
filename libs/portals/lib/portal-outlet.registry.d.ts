import { ViewContainerRef } from '@angular/core';
export declare class PortalOutletRegistry {
    private _targets;
    register(outletId: string, viewContainer: ViewContainerRef): void;
    remove(outletId: string): void;
    getTarget(outletId: string): ViewContainerRef | null;
}
