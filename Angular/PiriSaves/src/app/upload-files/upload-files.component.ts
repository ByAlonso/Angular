import { Component, OnInit } from '@angular/core';
import {User} from "../user.model";
import {Subscription} from "rxjs";
import {AuthenticationService} from "../services/authentication.service";
import {UserService} from "../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})
export class UploadFilesComponent implements OnInit {

	currentUser: User;
	currentUserSubscription: Subscription;
	username: String;
	private sub: any;

	constructor(
		private authenticationService: AuthenticationService,
		private activatedRoute: ActivatedRoute,
		private router: Router
	) {
		this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
			this.currentUser = user;
		},
			error1 => {
				this.router.navigate(['/']);
			});

		this.sub = this.activatedRoute.paramMap.subscribe(params => {
			this.username = params['params']['username'];
		})
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

}
