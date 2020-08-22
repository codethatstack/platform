import { Injector } from '@angular/core';
export declare class PortalInjector implements Injector {
    private _parentInjector;
    private _customTokens;
    constructor(_parentInjector: Injector, _customTokens: WeakMap<any, any>);
    get(token: any, notFoundValue?: any): any;
}
