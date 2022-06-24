import {AfterViewChecked, Component, OnChanges, OnInit} from '@angular/core';
import {api} from '../../features/posts/store'
import {store} from '../../store'
import {connect} from "@src/store/utils/connect";
import {QueryResultSelectorResult} from "@reduxjs/toolkit/dist/query/core/buildSelectors";

console.log(api.endpoints.getPosts)

const connection = connect({
	mapStateToProps: (state) => ({
		posts: api.endpoints.getPosts.select()(state)
	})
})

@Component({
	selector: 'app-post-list',
	templateUrl: './post-list.component.html',
	styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, AfterViewChecked {
	posts: QueryResultSelectorResult<any>;

	constructor() {
		store.dispatch(api.endpoints.getPosts.initiate())
		connection(this, store)
	}

	ngAfterViewChecked() {
		// console.log(this)
	}

	ngOnInit(): void {
	}

}
