import { Injectable} from '@angular/core';
import { Http , Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/subject';
import {User} from '../user/user.model';



@Injectable ()
export class UserService {

	private usersUrl: string = 'http://localhost:3000/api/user';

	errMessage = ''

	constructor(private http: Http){}

	
	//GET all users
	getAllUsers(): Observable<User[]> {
		return this.http.get(this.usersUrl)
		.map(res => res.json().data)
		.map(users => users.map(this.toUser)) //remaps users to our format
		.catch(this.handleError);
		
	}
	

	//GET single user
	getUser(): Observable<User>{
		let headers = new Headers();
		let token = localStorage.getItem('auth_token');
		headers.append('Content-Type', 'application/json');
		headers.append('Authorization', `Bearer ${token}`);
		
		let id = localStorage.getItem('userID');
		return this.http.get(`${this.usersUrl}/${id}`, {headers})
		.map((res) => {res.json().data;})
		.map(this.toUser(user))
		.catch(this.handleError); 

	}



	

	//PUT  update a user
	updateUser(user: User): Observable<User>{
		return this.http.put(`${this.usersUrl}/${user.id}`, user)
		.map(res => res.json())
		.catch(this.handleError);
	}


	//DELETE a user
	deleteUser(id: number): Observable<any>{
		return this.http.delete(`${this.usersUrl}/${id}`)
		.catch(this.handleError);
	}

	

	//Convert user info from API to our standard format
	private toUser(user): User {
		console.log(user)
		return{ //model:api
					id: user._id,
					email: user.email,
					role: user.role
				}
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