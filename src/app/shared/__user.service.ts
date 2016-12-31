import { Injectable} from '@angular/core';
import { Http , Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/subject';
import {User} from '../user/user.model';

@Injectable ()
export class UserService {

//private usersUrl: string = 'http://localhost:3000/api/user';
	private usersUrl: string = 'http://reqres.in/api/users';

constructor(private http: Http){}

_getUser(): Observable<Object>{

	let headers = new Headers();
	let token = localStorage.getItem('auth_token');
	headers.append('Content-Type', 'application/json');
	headers.append('Authorization', `Bearer ${token}`);

	let id = localStorage.getItem('userID');
	let url = `${this.usersUrl}/${id}`;
	console.log(url);
	
	return this.http.get(url,{headers})
	.map(res => res.json().data)
	.catch(this.handleError) 
}

getUser(id: number): Observable<Object>{ //get an Id and returns an Observable of a selected user

		return this.http.get(`${this.usersUrl}/${id}`)  //usage of ES6 template-string backticks
		.map(res => res.json().data)
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