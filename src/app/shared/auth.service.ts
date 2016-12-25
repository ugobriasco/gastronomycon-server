import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';



@Injectable() export class AuthService{
	private authUrl: string = 'localhost:3000/api';
	private loggedIn: boolean = false;

	constructor(private http: Http){
		this.loggedIn = !!localStorage.getItem('auth_token');
	}

	connectivityCheck(){return this.authUrl;}

	isLoggedIn(){return this.loggedIn;}

	login(email: string, password: string): Observable<String>{
		return this.http.post(`${this.authUrl}/login`,{email, password})
		.map( res => res.json())
		.do( res =>{
			if(res.token){ this.getToken(res.token);}
		})
		.catch(this.handleError);
	}

	signup(email: string, password: string): Observable<String>{
		return this.http.post(`${this.authUrl}/signup`,{email, password})
		.map( res => res.json())
		.do( res => {
			if(res.token){ this.getToken(res.token);}
		})
		.catch(this.handleError);
	}


	logout(){
		localStorage.removeItem('auth_token');
		this.loggedIn = false;
	}

	private getToken(token){
		localStorage.setItem('auth_token', token);
		this.loggedIn = true;
	}


	private handleError(err) {
	    let errMessage: string;

	    if (err instanceof Response) {
	      let body   = err.json() || '';
	      let error  = body.error || JSON.stringify(body);
	      errMessage = `${err.status} - ${err.statusText || ''} ${error}`;
	    } else {
	      errMessage = err.message ? err.message : err.toString();
	    }
	    return Observable.throw(errMessage);
	}

}
