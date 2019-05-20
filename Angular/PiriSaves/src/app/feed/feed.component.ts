import {Component, Input, OnInit} from '@angular/core';
import {PostService} from "../services/post.service";
import {Post} from "../post.model";
import {first} from "rxjs/internal/operators/first";
import {ProfileComponent} from "../profile/profile.component";
import {AuthenticationService} from "../services/authentication.service";
import {UserService} from "../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertService} from "../services/alert.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";


@Component({
	selector: 'app-feed',
	templateUrl: './feed.component.html',
	styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

	@Input()
	title: String;
	@Input()
	username: String;
	@Input()
	description: String;
	@Input()
	classe: String;
	@Input()
	edit: boolean;
	@Input()
	id: number;

	postForm: FormGroup;
	private actualPost: Post;
	private actualEdit: boolean;
	edit2 :boolean;
	images :String[] = [];


	constructor(private postService: PostService,
							private authenticationService: AuthenticationService,
							private userService: UserService,
							private activatedRoute: ActivatedRoute,
							private router: Router,
							private alertService: AlertService,
							private formBuilder: FormBuilder) {
	}

	ngOnInit() {
		this.desactivateEdit();

		this.postService.getPost(this.id).pipe(first()).subscribe(
			next=> {
				this.actualPost = next;
				this.actualPost.id = next[0]['id'];
				this.actualPost.description = next[0]['description'];
				this.actualPost.title = next[0]['title'];
				this.actualPost.classe = next[0]['class'];

			});

		this.postForm = this.formBuilder.group({
			id: this.id,
			title: new FormControl(),
			description: new FormControl(),
			class:new FormControl(),
			images: new FormControl(''),
		});


	}

	desactivateEdit()
	{
		this.edit2 = false;
	}

	activateEdit()
	{
		this.edit2 = true;
	}

	deletePost() {
		this.postService.delete(this.id).pipe(first()).subscribe(
			next => {
				console.log("borrado correctamente");
				location.reload();
			}
		);
	}


	makeChanges()
	{

		if(this.postForm.value['title'] == null)
		{
			this.postForm.value['title'] = this.actualPost.title;
		}
		if(this.postForm.value['description'] == null)
		{
			this.postForm.value['description'] = this.actualPost.description;
		}
		if(this.postForm.value['class'] == null)
		{
			this.postForm.value['class'] = this.actualPost.classe;
		}
		this.desactivateEdit();
		console.log(this.postForm.value);
		this.postService.updatePost(this.postForm.value).pipe(first()).subscribe(
			next =>{
				location.reload();
			},
			error => {
				console.log("MALPOST");
			}

		)

	}

}
