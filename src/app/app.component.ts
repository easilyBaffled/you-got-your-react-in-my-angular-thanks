import {Component} from "@angular/core";
import {isEqual} from "lodash";
import {api} from "@src/features/posts";
import {store} from "@src/store";
import {Router} from "@angular/router";

// select: initiate
@Component({
	selector: "app-root",
	templateUrl: "./app.component.html"
	// changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
	postsUnsub;
	posts = {};

	savePosts() {
		// const updates = api.endpoints.getPosts.select()(store.getState());
		// // console.log(updates, this.posts);
		// if (updates.data && !isEqual(updates, this.posts)) {
		//   this.posts = updates;
		//   console.log("posts", this.posts.status, this.posts.data);
		// }
	}

	constructor(private router: Router) {
		// this.postsUnsub = store.dispatch(api.endpoints.getPosts.initiate());
		// store.subscribe(this.savePosts.bind(this));
		document.addEventListener('routeChange', (e: CustomEvent) => {
			if (e.detail.url !== router.url)
				this.router.navigate([e.detail.url]).then(console.log).catch(console.error);

		})
	}

	ngOnDestroy() {
		// this.postsUnsub.unsubscribe();
	}
}
