import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PostDetailComponent } from "./post-detail/post-detail.component";
import { PostListComponent } from "./post-list/post-list.component";
import { PortalHookComponent } from "./portal-hook/portal-hook.component";

@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        PostListComponent,
        PostDetailComponent,
        PortalHookComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatListModule,
        AppRoutingModule,
        RouterModule
    ],
    providers: []
})
export class AppModule {}
