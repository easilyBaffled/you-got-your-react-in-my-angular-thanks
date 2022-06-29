import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PostDetailComponent } from "@src/app/post-detail/post-detail.component";

const routes: Routes = [{ component: PostDetailComponent, path: "posts/:id" }];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule {}
