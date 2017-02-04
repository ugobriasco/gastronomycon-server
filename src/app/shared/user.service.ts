import { Injectable} from '@angular/core';
import { Http , Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/subject';
import {User} from '../user/user.model';

@Injectable()
export class UserService {

	private MyUsersUrl: string = 'http://localhost:3000/api/user';
	
	constructor(private http: Http){}


	//public routes


	getUser(): Observable<User>{ //get an Id and returns an Observable of a selected user

		let myId = this.token2user();
		let headers = this.setHeaders();
		return this.http.get(`${this.MyUsersUrl}/${myId}`, {headers} )  //usage of ES6 template-string backticks
		.map(res => res.json().data)
		.catch(this.handleError);
	}

	
	getUserFromId(id:string): Observable<User>{
		let myId = this.token2user();
		let headers = this.setHeaders();
		
		return this.http.get(`${this.MyUsersUrl}/${id}`)
		.map(res => res.json)
		.catch(this.handleError);
	}

	getAllUsers(): Observable<User[]>{
		
		let headers = this.setHeaders();
		return this.http.get(this.MyUsersUrl, {headers})
		.map(res => res.json().data)
		.catch(this.handleError);
	}



	//protected routes
	updateUser(user): Observable<User>{

		let headers = this.setHeaders();

		let myId = localStorage.getItem('userID');

		return this.http.put(`${this.MyUsersUrl}/${myId}`, user, {headers})
		.map(res => res.json())
		.catch(this.handleError);

	}

	deleteUser(user): Observable<User>{
		let headers = this.setHeaders();


		return this.http.delete(`${this.MyUsersUrl}/${user._id}`, {headers})
		.map(res => res.json())
		.catch(this.handleError);

	}
	

	private setHeaders(){
		var headers = new Headers();
		let token = localStorage.getItem('auth_token');
		headers.append('Content-Type', 'application/json');
		headers.append('authorization', `Bearer ${token}`);
		//headers.append('x-access-token', token)
		return headers;

	}

	private token2user(){
		return localStorage.getItem('userID');
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