import { Injectable } from '@angular/core';
import {User} from "../user.model";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Post} from "../post.model";

@Injectable()
export class PostService {

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

	createPost(post: Post) {
		return this.http.post(`http://localhost:80/uploadFiles/` + post.username, Post);
	}

	update(user: User) {
		return this.http.put(`http://localhost:80/profile/` + user.username, user);
	}

	delete(id: number) {
		return this.http.delete(`/` + id);
	}
}
