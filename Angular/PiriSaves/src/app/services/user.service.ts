import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../user.model';
import {BehaviorSubject, config, Observable} from "rxjs";

@Injectable()
export class UserService {
	private actualUserSubject: BehaviorSubject<User>;
	public actualUser: Observable<User>;

	constructor(private http: HttpClient) {
		this.actualUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('actualUser')));
		this.actualUser = this.actualUserSubject.asObservable();
	}

	getAll() {
		return this.http.get<User[]>(`/`);
	}

	getById(id: number) {
		return this.http.get(`/` + id);
	}
	getByUsername(username:String)
	{
		return this.http.get<User>('http://localhost:80/profile/' + username);
	}

	register(user: User) {
		return this.http.post(`http://localhost:80/register`, user);
	}

	update(user: User) {
		return this.http.put(`http://localhost:80/profile/` + user.username, user);
	}

	delete(username:String) {
		return this.http.delete(`http://localhost:80/profile/delete/` + username);
	}
}
