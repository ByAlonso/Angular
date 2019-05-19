import { Component, OnInit } from '@angular/core';
import {Post} from "../../post.model";
import {PostService} from "../../services/post.service";
import {ActivatedRoute, Router} from "@angular/router";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-profile-feed',
  templateUrl: './profile-feed.component.html',
  styleUrls: ['./profile-feed.component.css']
})
export class ProfileFeedComponent implements OnInit {

	private posts: Post[];
	username: String;
	private sub: any;

  constructor(private postService: PostService,
							private activatedRoute: ActivatedRoute,
							private router: Router) {

		this.activatedRoute.params.subscribe(val => {
			this.sub = this.activatedRoute.paramMap.subscribe(
				params => {
					this.username = params['params']['username']
				}
			);

			this.postService.getByUsername(this.username).pipe(first()).subscribe(
				next =>{
					this.posts = next;
					console.log(this.posts);
				}
			);
		});
	}

  ngOnInit() {}

}
