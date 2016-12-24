import { Injectable} from '@angular/core';
import { Http , Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/subject';
import {User} from '../models/user';



@Injectable ()
export class UserService {

	private usersUrl: string = 'http://localhost:3000/api/user';


	/**
	 * EVENT EMITTER SERVICE any component can emmit/listen events
	 * Generally in a separated file
	 */

	 //observable source
	 private userCreatedSource = new Subject<User>();
	 private userDeletedSource = new Subject();

	 //observable stream
	 userCreated$ = this.userCreatedSource.asObservable();
	 userDeleted$ = this.userDeletedSource.asObservable();

		 //add to the stream the info that the user was created
		userCreated(user: User) {
	    	this.userCreatedSource.next(user); //pass into the subject
	  	}
	  	//add to the stream the info that the user was deleted
	  	userDeleted() {
	    this.userDeletedSource.next();
	  	}

	 /**
	  * http handling
	  */
	constructor(private http: Http){}

	
	//GET all users
	getUsers(): Observable<User[]> { //get no input, returns an Observable of Users
		return this.http.get(this.usersUrl)
		.map(res => res.json().data)
		.map(users => users.map(this.toUser)) //remaps users to our format
		.catch(this.handleError);
		
	}
	

	//GET single user

	getUser(id: number): Observable<User>{ //get an Id and returns an Observable of a selected user
		//attaching a token
		let headers = new Headers();
		let token = localStorage.getItem('auth_token');
		headers.append('Content-Type', 'application/json');
		headers.append('Authorization', `Bearer ${token}`);

		return this.http.get(`${this.usersUrl}/${id}`, {headers})  //usage of ES6 template-string backticks
		.map(res => res.json().data)
		.map(this.toUser) //in this cas we have a single user, so we dont need to map them
		.catch(this.handleError);
	}
	
	//PUT  update a user
	updateUser(user: User): Observable<User>{
		return this.http.put(`${this.usersUrl}/${id}`, user)
		.map(res => res.json())
		.catch(this.handleError);


	}


	//DELETE a user
	deleteUser(id: number): Observable<any>{
		return this.http.delete(`${this.usersUrl}/${id}`)
		.do(res => this.userDeleted())
		.catch(this.handleError);


	}

	

	//Convert user info from API to our standard format
	private toUser(user): User {
		return{
					id: user._id,
					name: user.name,
					email: user.email,
					avatar: user.avatar
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