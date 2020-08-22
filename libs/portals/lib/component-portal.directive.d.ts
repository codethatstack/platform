import { ViewContainerRef, OnChanges, SimpleChanges, ComponentRef, EventEmitter, OnDestroy } from '@angular/core';
import { PortalService } from './portal.service';
export declare class ComponentPortalDirective implements OnChanges, OnDestroy {
    private portalService;
    private viewContainerRef;
    private _componentRef;
    private _componentId$;
    private _subscription;
    componentId: string;
    attachTo: string;
    context: any;
    content: any[][];
    activated: EventEmitter<ComponentRef<any>>;
    deactivated: EventEmitter<ComponentRef<any>>;
    constructor(portalService: PortalService, viewContainerRef: ViewContainerRef);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    private destroyComponent;
}
