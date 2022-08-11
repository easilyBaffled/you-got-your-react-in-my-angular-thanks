import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PortalHookComponent } from "./portal-hook.component";

describe("PortalHookComponent", () => {
    let component: PortalHookComponent;
    let fixture: ComponentFixture<PortalHookComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PortalHookComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PortalHookComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
