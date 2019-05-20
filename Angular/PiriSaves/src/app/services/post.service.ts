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

	getByClass(classe: String) {
		return this.http.get<Post[]>(`http://localhost:80/` + classe);
	}

	getPost(id: number)
	{
		return this.http.get<Post>('http://localhost:80/profile/edit/' + id);
	}
	getByUsername(username:String)
	{
		return this.http.get<Post[]>('http://localhost:80/profile/' + username);
	}

	createPost(poste: Post) {
		return this.http.post('http://localhost:80/uploadFiles/' + poste.username, poste);
	}

	updatePost(poste:Post) {
		return this.http.put(`http://localhost:80/profile/edit/` + poste.id, poste);
	}

	delete(id: number) {
		return this.http.delete('http://localhost:80/profile/' + id);
	}

	getPhotos(id :number){
		return this.http.get<String[]>('http://localhost:80/getPhotos/' + id);
	}
}
