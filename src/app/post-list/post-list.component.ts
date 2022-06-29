import { AfterViewChecked, Component, OnChanges, OnInit } from "@angular/core";
import { QueryResultSelectorResult } from "@reduxjs/toolkit/dist/query/core/buildSelectors";

import { connect } from "@src/store/utils/connect";

import { api } from "../../features/posts/store";
import { store } from "../../store";

const connection = connect({
    mapStateToProps: (state) => ({
        posts: api.endpoints.getPosts.select()(state)
    })
});

@Component({
    selector: "app-post-list",
    styleUrls: ["./post-list.component.css"],
    templateUrl: "./post-list.component.html"
})
export class PostListComponent implements OnInit, AfterViewChecked {
    posts: QueryResultSelectorResult<any>;

    constructor() {
        store.dispatch(api.endpoints.getPosts.initiate());
        connection(this, store);
    }

    ngAfterViewChecked() {
        // console.log(this)
    }

    ngOnInit(): void {}
}
