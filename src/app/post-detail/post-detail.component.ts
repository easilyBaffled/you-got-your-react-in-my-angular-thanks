import { AfterViewChecked, Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";

import { connect } from "@src/store/utils/connect";

import { api } from "../../features/posts/store";
import { store } from "../../store";

const connection = connect({
    mapStateToProps: (state, { id }) => ({
        post: api.endpoints.getPost.select(id)(state)
    })
});

@Component({
    selector: "app-post-detail",
    styleUrls: ["./post-detail.component.css"],
    templateUrl: "./post-detail.component.html"
})
export class PostDetailComponent implements OnInit, AfterViewChecked {
    id: string;
    post = { data: {}, status: "none" };

    constructor(private route: ActivatedRoute) {
        connection(this, store);
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.id = params.get("id");
            store.dispatch(api.endpoints.getPost.initiate(this.id));
        });
    }

    ngAfterViewChecked() {
        // console.log(this)
    }
}
