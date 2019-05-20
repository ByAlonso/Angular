import {Component, OnInit} from '@angular/core';

import {User} from '../user.model';
import {UserService} from "../services/user.service";
import {AuthenticationService} from "../services/authentication.service";
import {Subscription} from "rxjs";
import {first} from "rxjs/internal/operators/first";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	currentUser: User;
	currentUserSubscription: Subscription;
	searchItem: FormControl;
	userForm: FormGroup;
	constructor(
		private authenticationService: AuthenticationService,
		private router: Router,
		private formBuilder: FormBuilder,
	) {
		this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
			this.currentUser = user;
		});

		this.userForm = this.formBuilder.group({
			searchItem: new FormControl()
		});
	}

	ngOnInit() {

	}

	search()
	{
		console.log(this.userForm.value['searchItem']);
		this.router.navigate(['/profile/'+  this.userForm.value['searchItem']]);
	}
	logoutClicked() {
		this.authenticationService.logout();
	}
}
