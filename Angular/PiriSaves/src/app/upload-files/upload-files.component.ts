import {Component, OnInit} from '@angular/core';
import {User} from "../user.model";
import {Subscription} from "rxjs";
import {AuthenticationService} from "../services/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PostService} from "../services/post.service";
import {first} from "rxjs/internal/operators/first";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
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
	private url = '';
	private images: String[] = [];

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


	}

	ngOnInit() {
		if (this.currentUser == null) {
			this.router.navigate(['/']);
		} else if (this.username != this.currentUser.username) {
			this.router.navigate(['/uploadFiles/' + this.currentUser.username]);

		} else if (this.username == this.currentUser.username) {
			this.postForm = this.formBuilder.group({
				username: this.currentUser.username,
				title: ['', Validators.required],
				description: ['', Validators.required],
				classe: new FormControl(),
				images: new FormControl('')
			});
		}
	}

	onSelectFile(event) {
		for (var x = 0; x < event.target.files.length; x++) {
			if (event.target.files && event.target.files[x]) {
				var reader = new FileReader();
				reader.readAsDataURL(event.target.files[x]); // read file as data url
				reader.onload = (event) => { // called once readAsDataURL is completed
					this.url = event.target['result'];
					this.images.push(event.target['result']);
				}
			}
		}
	}


	onSubmit() {
		if (this.postForm.invalid) {
			return;
		}
		this.postForm.controls['images'].setValue(this.images ? this.images : '');

		console.log(this.postForm.value);
		console.log(this.postForm.value['username']);

		this.postService.createPost(this.postForm.value).pipe(first()).subscribe(
			next => {
				this.alertService.success('Post subido correctamente', true);
				location.reload();
			},
			error => {
				console.log("MAL");
			}
		);
	}

}
