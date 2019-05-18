import { Component, OnInit } from '@angular/core';
import {first} from "rxjs/operators";
import {PostService} from "../../services/post.service";
import {Post} from "../../post.model";

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {

	private posts: Post[];

  constructor(private postService: PostService) { }

	ngOnInit() {
		this.postService.getAll().pipe(first()).subscribe(
			next =>{
				this.posts = next;
				console.log(this.posts);
			},
			error =>{
				console.log("MAL");
			}
		)
	};

}
