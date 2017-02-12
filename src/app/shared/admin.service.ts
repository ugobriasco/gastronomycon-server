import { Injectable, Inject } from '@angular/core';
import { Http , Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/subject';
import { APP_CONFIG, IAppConfig } from '../app.config';



@Injectable()
export class AdminService {

	private settingsUrl = '';
	
	constructor(
		private http: Http, 
		@Inject(APP_CONFIG) private config: IAppConfig
		){
		this.settingsUrl = config.apiEndpoint + 'settings';

	}



	setSignupCode(setting): Observable<{'name', 'value', 'enabled'}>{
		let headers = this.setHeaders();
		//let setting = {'enabled': enabled, 'value': value};
		console.log(setting);
		return this.http.put(`${this.settingsUrl}/signupCode`,setting, {headers})
		.map(res => res.json().data)
		.catch(this.handleError);
	}


	getSignupCode(): Observable<{'name', 'value', 'enabled'}>{
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