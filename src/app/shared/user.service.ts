import { Injectable} from '@angular/core';
import { Http , Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/subject';

@Injectable()
export class UserService {

	private MyUsersUrl: string = 'http://localhost:3000/api/user';
	
	constructor(private http: Http){}

	getUser(): Observable<Object>{ //get an Id and returns an Observable of a selected user

		let headers = new Headers();
		let token = localStorage.getItem('auth_token');
		headers.append('Content-Type', 'application/json');
		headers.append('Authorization', `Bearer ${token}`);

		let myId = localStorage.getItem('userID');

		return this.http.get(`${this.MyUsersUrl}/${myId}`, {headers})  //usage of ES6 template-string backticks
		.map(res => res.json().data)
		.catch(this.handleError);
	}

	updateUser(user): Observable<Object>{


		let headers = new Headers();
		let token = localStorage.getItem('auth_token');
		headers.append('Content-Type', 'application/json');
		headers.append('Authorization', `Bearer ${token}`);

		let myId = localStorage.getItem('userID');

		return this.http.put(`${this.MyUsersUrl}/${myId}`, user, {headers})
		.map(res => res.json())
		.catch(this.handleError);

	}

	

	//Error handling from API
	private handleError(err){
		//super duper error handling
			let errMessage: string;
			if(err instanceof Response){
				let body 	= err.json() || '' ; //Uncaught SyntaxError: Unexpected token C in JSON at position 0
				let error 	= body.error || JSON.stringify(body);
				errMessage 	= `${err.status} - ${err.statusText || ''} ${error}`;
			}else{
				errMessage 	= err.message ? err.message : err.toString();
			}
			return Observable.throw(errMessage);
	}

}