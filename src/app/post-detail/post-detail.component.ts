import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {api} from '../../features/posts/store'
import {connect} from "@src/store/utils/connect";
import {store} from '../../store'
import {isEqual} from "lodash";
import {ActivatedRoute, ParamMap} from "@angular/router";

const connection = connect({
	mapStateToProps: (state, {id}) => ({
		post: api.endpoints.getPost.select(id)(state)
	})
})


@Component({
	selector: 'app-post-detail',
	templateUrl: './post-detail.component.html',
	styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit, AfterViewChecked {
	id: string;
	post = {status: 'none', data: {}}

	constructor(
		private route: ActivatedRoute,
	) {
		connection(this, store)
	}

	ngOnInit(): void {
		this.route.paramMap.subscribe((params: ParamMap) => {
			this.id = params.get('id')
			store.dispatch(api.endpoints.getPost.initiate(this.id))

		})
	}

	ngAfterViewChecked() {
		// console.log(this)
	}
}
