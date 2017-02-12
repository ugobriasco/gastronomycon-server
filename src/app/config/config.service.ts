import { Injectable } from '@angular/core';
import { Http , Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/subject';

@Injectable()
export class ConfigService {

	private _config: Object
	private _env: Object

  constructor(private http: Http) { }


  load(){
  	(resolve, reject) => {
  		this.http.get('src/app/config/env.json')
  		.map(res => res.json())
  		.subscribe((env, data) => {

  			this._env = env_data;
  			this.http.get('src/app/config/'+ env_data.env +'.json')
  			.map(rs => res.json())
  			.catch((error, any) => {
  				console.log(error);
  				return.Observable.throw(error.json().error || 'Server error');
  			})
  			.subscribe((data) => {
  				this._config = data;
  				resolve(true);
  			})

  		});
  	}
  }

  getEnv(key: any){
  	return this._env[key];
  }

  get(key: any){
  	return this._config[key];
  }

}
