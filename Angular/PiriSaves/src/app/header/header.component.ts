import {Component, OnInit} from '@angular/core';

import {User} from '../user.model';
import {UserService} from "../services/user.service";
import {AuthenticationService} from "../services/authentication.service";
import {Subscription} from "rxjs";
import {first} from "rxjs/internal/operators/first";
import {Router} from "@angular/router";

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	currentUser: User;
	currentUserSubscription: Subscription;

	constructor(
		private authenticationService: AuthenticationService,
	) {
		this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
			this.currentUser = user;
		});
	}

	ngOnInit() {

	}

	logoutClicked() {
		this.authenticationService.logout();
	}
}
