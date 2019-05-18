import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {UserService} from "../services/user.service";
import {AlertService} from "../services/alert.service";
import {AuthenticationService} from "../services/authentication.service";


@Component({
	selector: 'app-profile',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	userForm: FormGroup;
	loading = false;
	submitted = false;

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private userService: UserService,
		private alertService: AlertService,
		private authenticationService: AuthenticationService) { }

	ngOnInit() {
		if(this.authenticationService.currentUserValue != null)
		{
			this.router.navigate(['/']);
		}
		this.userForm = this.formBuilder.group({
			username: ['', Validators.required],
			mail: ['', [Validators.required,Validators.email]],
			password: ['', [Validators.required, Validators.minLength(3)]]
		});
	}

	// convenience getter for easy access to form fields
	get f() { return this.userForm.controls; }

	onSubmit() {
		this.submitted = true;

		// stop here if form is invalid
		if (this.userForm.invalid) {
			return;
		}

		this.loading = true;
		this.userService.register(this.userForm.value)
			.pipe(first())
			.subscribe(
				data => {
					this.alertService.success('Registration successful', true);
					this.router.navigate(['/login']);
				},
				error => {
					this.alertService.error(error);
					this.loading = false;
				});
	}
}
