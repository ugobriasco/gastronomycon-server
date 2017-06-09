import { Injectable, Inject } from '@angular/core';
import { Http , Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/subject';
import { APP_CONFIG, IAppConfig } from '../app.config';


@Injectable()
export class ItemsService {

	private itemsUrl: string = ''
	private selectedItem: string = '';

  constructor(
    private http: Http,
    @Inject(APP_CONFIG) private config: IAppConfig
    ){
        this.itemsUrl = config.apiEndpoint + 'item';
    }

  getItems(): Observable<Object[]> {
  	return this.http.get(this.itemsUrl)
  	.map(res => res.json().data)
  	.catch(this.handleError);
  }

  getItem(id: string): Observable<Object>{
  	return this.http.get(`${this.itemsUrl}/${id}`)
  	.map(res => res.json().data)
  	.catch(this.handleError);
  }

  createItem(item): Observable<Object>{
    let headers = this.setHeaders();
    return this.http.post(`${this.itemsUrl}`, item, {headers})
    .map(res => res.json)
    .catch(this.handleError);
  }

  updateItem(item): Observable<Object>{
    let headers = this.setHeaders();
  	return this.http.put(`${this.itemsUrl}/${item._id}`, item, {headers})
  	.map(res => res.json)
  	.catch(this.handleError);
  }

  deleteItem(item): Observable<Object>{
    let headers = this.setHeaders();
    return this.http.delete(`${this.itemsUrl}/${item._id}`,{headers})
    .map(res => res.json)
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
