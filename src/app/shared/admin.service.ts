import { Injectable } from '@angular/core';
import { Http , Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AdminService {
	
	constructor(private http: Http) {}

	private settingsUrl ='http://localhost:3000/api/settings';

	setSignupCode(value): void{

		let headers = this.setHeaders();
		this.http.get(`${this.settingsUrl}/signupCode`, {headers})
		.map(res => {
			if(!res.json().data) {
				let setting = {'name': 'signupCode', 'value': value}
				this.http.post(this.settingsUrl, setting ,{headers})
				.map(res => res.json())
				.catch(this.handleError);
			} else {
				this.http.put(`${this.settingsUrl}/signupCode`, {'value': value},{headers})
				.map(res => res.json())
				.catch(this.handleError);
			}
		})
		.catch(this.handleError);
	}


	getSignupCode(): Observable<{'name', 'value'}>{
		let headers = this.setHeaders();
		return this.http.get(`${this.settingsUrl}/signupCode`, {headers})
		.map(res => res.json().data)
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