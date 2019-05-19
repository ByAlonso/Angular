import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
	currentUser: User;
	currentUserSubscription: Subscription;
	edit: boolean;
	actualUser : User;
	username: String;
	private sub: any;
	userForm: FormGroup;
	private posts: Post[];

	constructor(
		private authenticationService: AuthenticationService,
		private userService: UserService,
		private activatedRoute : ActivatedRoute,
		private router:Router,
		private alertService: AlertService,
		private formBuilder: FormBuilder
	) {
		this.router.routeReuseStrategy.shouldReuseRoute = () => false;
		this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
			this.currentUser = user;
		});

		this.sub = this.activatedRoute.paramMap.subscribe(params => {
			this.userService.getByUsername(params['params']['username']).subscribe(
				next=>{
					this.actualUser = next;
					this.posts = next['posts'];
				})
		});
	}

  ngOnInit() {

		this.desactivarEdit();
		this.userForm = this.formBuilder.group({
			username: this.currentUser.username,
			name: new FormControl(),
			description: new FormControl(),
			image: new FormControl(),
		});
  }

  activarEdit()
	{
		this.edit = true;
	}

	desactivarEdit()
	{
		this.edit = false;
	}

	onSubmit()
	{
		this.desactivarEdit();
		this.userService.update(this.userForm.value).pipe(first()).subscribe(
			next =>{
				this.alertService.success('Se ha actualizado el perfil', true);
				location.reload();
			},
			error =>{
				console.log("MAL");
			}

		);
		this.router.navigate(['/profile/' + this.currentUser.username]);
	}
}
