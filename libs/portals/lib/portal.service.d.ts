import { ComponentRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ComponentResolverService } from './component-resolver.service';
import { PortalOutletRegistry } from './portal-outlet.registry';
import { CreateComponentParams } from './portal-types';
export declare class PortalService {
    private componentResolverService;
    private portalOutletRegistry;
    constructor(componentResolverService: ComponentResolverService, portalOutletRegistry: PortalOutletRegistry);
    createComponent({ componentId, outletId, viewContainerRef, injector, context, content }: CreateComponentParams): Observable<ComponentRef<any>>;
}
