import { Injectable, Inject } from '@angular/core';
import { Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { APP_CONFIG, IAppConfig } from '../app.config';



@Injectable() export class AuthService{
	private authUrl = '';
	private loggedIn: boolean = false;
	private userID: string = '';

	constructor(private http: Http, @Inject(APP_CONFIG) private config: IAppConfig){
		this.authUrl = config.apiEndpoint;
		this.loggedIn = !!localStorage.getItem('auth_token');
		this.userID = localStorage.getItem('userID');
	}

	connectivityCheck(){return this.authUrl;}

	isLoggedIn(){return this.loggedIn;}
	getUserID(){return this.userID;}

	login(email: string, password: string): Observable<String>{
		return this.http.post(`${this.authUrl}/login`,{email, password})
		.map( res => res.json())
		.do( res =>{
			if(res.token){ this.setToken(res.token);}
			if(res.user._id){this.setUserID(res.user._id);}
		})
		.catch(this.handleError);
	}

	signup(email: string, password: string, signupCode: string): Observable<String>{
		return this.http.post(`${this.authUrl}/signup`,{email, password, signupCode})
		.map( res => res.json())
		.do( res => {
			if(res.token){ this.setToken(res.token);}
			if(res.user._id){this.setUserID(res.user._id);}
		})
		.catch(this.handleError);
	}


	logout(){
		localStorage.removeItem('auth_token');
		localStorage.removeItem('userID');
		this.loggedIn = false;
	}

	

	private setToken(token){
		localStorage.setItem('auth_token', token);
		this.loggedIn = true;
	}

	private setUserID(userID){
		localStorage.setItem('userID', userID);
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
