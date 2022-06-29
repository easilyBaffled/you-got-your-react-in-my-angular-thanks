import { Component } from "@angular/core";
import { Router } from "@angular/router";

// select: initiate
@Component({
    selector: "app-root",
    templateUrl: "./app.component.html"
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
    posts = {};

    constructor(private router: Router) {
        // this.postsUnsub = store.dispatch(api.endpoints.getPosts.initiate());
        // store.subscribe(this.savePosts.bind(this));
        document.addEventListener("routeChange", (e: CustomEvent) => {
            if (e.detail.url !== router.url)
                this.router.navigate([e.detail.url]); // .then(console.log).catch(console.error);
        });
    }

    ngOnDestroy() {
        // this.postsUnsub.unsubscribe();
    }
}
