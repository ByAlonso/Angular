import { Component, OnInit } from '@angular/core';
import {PostService} from "../../services/post.service";
import {Post} from "../../post.model";
import {first} from "rxjs/internal/operators/first";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {

	private posts: Post[];
	classe: String;
	private sub: any;

  constructor(private postService: PostService,
							private activatedRoute: ActivatedRoute,
							private router: Router) {

		this.activatedRoute.params.subscribe(val => {
			this.sub = this.activatedRoute.paramMap.subscribe(
				params => {
					this.classe = params['params']['class']
				}
			);

			this.postService.getByClass(this.classe).pipe(first()).subscribe(
				next =>{
					this.posts = next;
					console.log(this.posts);
				}
			);
		});

	}

  ngOnInit() {}

}
