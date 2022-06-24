import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {PostDetailComponent} from "@src/app/post-detail/post-detail.component";

const routes: Routes = [
	{path: 'posts/:id', component: PostDetailComponent},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
