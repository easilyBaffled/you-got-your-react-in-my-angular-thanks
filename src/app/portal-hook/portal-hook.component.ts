import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { store } from "@src/store";
import { activate, deactivate } from "@src/components/Portal";

@Component({
    selector: "portal-hook",
    template: ` <div
        class="portal-hook"
        [attr.data-portal-hook]="selector"
    ></div>`
})
export class PortalHookComponent implements OnInit, OnDestroy {
    @Input("selector") selector = "";

    constructor() {}

    // might need to be ngAfterViewInit
    ngOnInit(): void {
        store.dispatch(activate(this.selector));
    }

    ngOnDestroy(): void {
        store.dispatch(deactivate(this.selector));
    }
}
