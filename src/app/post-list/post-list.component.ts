import { Component, OnInit } from '@angular/core';
import { api } from '../../features/posts/store'
import { store }  from '../../store'
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
	postsList = [
		{
			"id": "cm1WPc_b5Q425gWEEJkch",
			"name": "A sample post"
		},
		{
			"id": "eCfO__Px8VmXbBfoYu53q",
			"name": "A post about RTK Query"
		},
		{
			"id": "zG04X4ihIaRPlbSNclM5i",
			"name": "How to randomly throw errors, a novella"
		}
	]

  constructor() {
	  console.log(api.endpoints.getPosts, store.dispatch)
//	  store.subscribe
	  const result = store.dispatch(api.endpoints.getPosts.initiate())
	  console.log(result)

  }

  ngOnInit(): void {
  }

}
