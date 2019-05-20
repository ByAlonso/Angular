import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../services/authentication.service";
import {UserService} from "../services/user.service";
import {User} from "../user.model";
import {Subscription} from "rxjs";
import {first} from "rxjs/operators";
import {Alert, error} from "selenium-webdriver";
import {AlertService} from "../services/alert.service";
import {Post} from "../post.model";
import {copyObj} from "@angular/animations/browser/src/util";
import {post} from "selenium-webdriver/http";
import {tryCatch} from "rxjs/internal-compatibility";


@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
	currentUser: User;
	currentUserSubscription: Subscription;
	edit: boolean;
	actualUser: User;
	username: String;
	private sub: any;
	userForm: FormGroup;
	private posts: Post[];
	url = '';

	constructor(
		private authenticationService: AuthenticationService,
		private userService: UserService,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private alertService: AlertService,
		private formBuilder: FormBuilder,
	) {

		this.router.routeReuseStrategy.shouldReuseRoute = () => false;
		this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
			this.currentUser = user;
		});

		this.sub = this.activatedRoute.paramMap.subscribe(params => {
			this.userService.getByUsername(params['params']['username']).subscribe(
				next => {
					this.posts = next['posts'];
					console.log(this.posts);
					this.actualUser = next;
				}, error => {
					router.navigate(['/a/error'])
				})
		});
	}

	ngOnInit() {

		this.desactivarEdit();
		this.userForm = this.formBuilder.group({
			username: new FormControl(),
			name: new FormControl(),
			description: new FormControl(),
			image: new FormControl(''),
		});
	}

	activarEdit() {
		this.edit = true;
		this.userForm = this.formBuilder.group({
			username: this.currentUser.username,
			name: new FormControl(),
			description: new FormControl(),
			image: new FormControl(''),
		});
	}

	desactivarEdit() {
		this.edit = false;
	}

	onSelectFile(event) {
		if (event.target.files && event.target.files[0]) {
			var reader = new FileReader();

			reader.readAsDataURL(event.target.files[0]); // read file as data url
			console.log(reader);
			reader.onload = (event) => { // called once readAsDataURL is completed
				this.url = event.target['result'];
				console.log(this.url);
				this.userForm.controls['image'].setValue(this.url ? this.url : '');
			}
		}
	}


	onSubmit() {
		console.log(this.userForm.value);
		if (this.userForm.value['name'] == null) {
			this.userForm.value['name'] = this.actualUser.name;
		}
		if (this.userForm.value['description'] == null) {
			this.userForm.value['description'] = this.actualUser.description;
		}
		if (this.userForm.value['image'] == null || this.userForm.value['image'] == '') {
			this.userForm.value['image'] = this.actualUser.image;
		}

		this.desactivarEdit();

		this.userService.update(this.userForm.value).pipe(first()).subscribe(
			next => {
				this.alertService.success('Se ha actualizado el perfil', true);
				location.reload();
			},
			error => {
				console.log("MAL");
			}
		);
	}

	deleteUser() {
		this.userService.delete(this.currentUser.username).pipe(first()).subscribe(
			next => {
				console.log("Usuario eliminado correctamente");
				this.authenticationService.logout();
				this.router.navigate(['/#']);
			}
		)
	}
}
