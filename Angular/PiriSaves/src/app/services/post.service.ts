import { Injectable } from '@angular/core';
import {User} from "../user.model";
import {HttpClient} from "@angular/common/http";
import {Post} from "../post.model";

@Injectable()
export class PostService {


	constructor(private http: HttpClient) {
	}

	getAll() {
		return this.http.get<Post[]>(`http://localhost:80/`);
	}

	getById(id: number) {
		return this.http.get(`/` + id);
	}
	getByUsername(username:String)
	{
		return this.http.get<User>('http://localhost:80/profile/' + username);
	}

	createPost(poste: Post) {
		return this.http.post('http://localhost:80/uploadFiles/' + poste.username, poste);
	}

	update(user: User) {
		return this.http.put(`http://localhost:80/profile/` + user.username, user);
	}

	delete(id: number) {
		return this.http.delete(`/` + id);
	}
}
