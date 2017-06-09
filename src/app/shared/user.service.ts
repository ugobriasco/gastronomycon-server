import { Injectable, Inject} from '@angular/core';
import { Http , Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/subject';
import {User} from '../user/user.model';
import { APP_CONFIG, IAppConfig } from '../app.config';


@Injectable()
export class UserService {
	
	private userUrl = '';

	constructor( 
		private http: Http, 
		@Inject(APP_CONFIG) private config: IAppConfig
		){		
			this.userUrl = config.apiEndpoint + 'user';
		}

	getUser(): Observable<User>{ //get an Id and returns an Observable of a selected user
		let myId = this.token2user();
		let headers = this.setHeaders();
		return this.http.get(`${this.userUrl}/${myId}`, {headers} )  //usage of ES6 template-string backticks
		.map(res => res.json().data)
		.catch(this.handleError);
	}

	
	getUserFromId(id:string): Observable<User>{
		let myId = this.token2user();
		let headers = this.setHeaders();		
		return this.http.get(`${this.userUrl}/${id}`)
		.map(res => res.json)
		.catch(this.handleError);
	}

	getAllUsers(): Observable<User[]>{	
		let headers = this.setHeaders();
		return this.http.get(this.userUrl, {headers})
		.map(res => res.json().data)
		.catch(this.handleError);
	}

	updateCurrentUser(user): Observable<User>{
		let headers = this.setHeaders();
		let myId = localStorage.getItem('userID');
		return this.http.put(`${this.userUrl}/${myId}`, user, {headers})
		.map(res => res.json())
		.catch(this.handleError);
	}

	updateUser(user): Observable<User>{
		let headers = this.setHeaders();
		return this.http.put(`${this.userUrl}/${user._id}`, user, {headers})
		.map(res => res.json())
		.catch(this.handleError);
	}

	deleteUser(user): Observable<User>{
		let headers = this.setHeaders();


		return this.http.delete(`${this.userUrl}/${user._id}`, {headers})
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