import { OnInit, ViewContainerRef, OnDestroy } from '@angular/core';
import { PortalOutletRegistry } from './portal-outlet.registry';
export declare class PortalOutletDirective implements OnInit, OnDestroy {
    private portalOutletRegistry;
    private viewContainer;
    outletId: string;
    constructor(portalOutletRegistry: PortalOutletRegistry, viewContainer: ViewContainerRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
