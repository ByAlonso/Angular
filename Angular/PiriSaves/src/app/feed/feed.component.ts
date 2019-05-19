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

	@Input()
	title:String;
	@Input()
	username:String;
	@Input()
	description:String;
	@Input()
	classe: String;

  constructor(private postService: PostService) {
  }

  ngOnInit() {}
}
