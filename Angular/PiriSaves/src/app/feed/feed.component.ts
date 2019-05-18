import {Component, Input, OnInit} from '@angular/core';
import {PostService} from "../services/post.service";
import {Post} from "../post.model";
import {first} from "rxjs/internal/operators/first";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

	private post: Post[];

	@Input()
	title:String;
	@Input()
	username:String;
	@Input()
	description:String;

  constructor(private postService: PostService) {
  }

  ngOnInit() {
		this.postService.getAll().pipe(first()).subscribe(
			next =>{
						this.post = next;
						console.log(this.post);
			},
			error =>{
				console.log("MAL");
			}
		)
	};
}
