import { Component, OnInit } from '@angular/core';
import {User} from "../user.model";
import {Subscription} from "rxjs";
import {AuthenticationService} from "../services/authentication.service";
import {UserService} from "../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpResponse} from "@angular/common/http";
import {PostService} from "../services/post.service";
import {first} from "rxjs/internal/operators/first";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Alert} from "selenium-webdriver";
import {AlertService} from "../services/alert.service";

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})
export class UploadFilesComponent implements OnInit {
	postForm: FormGroup;
	currentUser: User;
	currentUserSubscription: Subscription;
	username: String;
	private sub: any;

	constructor(
		private authenticationService: AuthenticationService,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private formBuilder: FormBuilder,
		private postService: PostService,
		private alertService: AlertService
	) {
		this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
			this.currentUser = user;
		},
			error1 => {
				this.router.navigate(['/']);
			});

		this.sub = this.activatedRoute.paramMap.subscribe(params => {
			this.username = params['params']['username'];
		});

		this.postForm = this.formBuilder.group({
			username: this.currentUser.username,
			title: ['',Validators.required],
			description : ['', Validators.required],
			classe:['',Validators.required]
		});
	}

  ngOnInit() {
		if(this.currentUser == null)
		{
			this.router.navigate(['/']);
		}
		else if(this.username != this.currentUser.username)
		{
			this.router.navigate(['/uploadFiles/' + this.currentUser.username]);
		}
  }
  onSubmit()
	{
		this.postService.createPost(this.postForm.value).pipe(first()).subscribe(
			next =>{
				this.alertService.success('Post subido correctamente', true);
			}
		)
	}

}
