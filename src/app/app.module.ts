import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {PostListComponent} from './post-list/post-list.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from '@angular/material/list';
import {RouterModule} from "@angular/router";
import {AppRoutingModule} from './app-routing.module';
import { PostDetailComponent } from './post-detail/post-detail.component';

@NgModule({
	declarations: [AppComponent, PostListComponent, PostDetailComponent],
	imports: [
		BrowserModule, ReactiveFormsModule, HttpClientModule, BrowserAnimationsModule, MatIconModule, MatListModule, AppRoutingModule, RouterModule],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
