import { Injectable } from '@angular/core';
import { Http , Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/subject';

@Injectable()
export class ItemsService {

	private itemsUrl: string = 'http://localhost:3000/api/item'
	private selectedItem: string = '';

  constructor(private http: Http) {}

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
    return this.http.post(`${this.itemsUrl}`, item)
    .map(res => res.json)
    .catch(this.handleError);
  }


  updateItem(item): Observable<Object>{
  	return this.http.put(`${this.itemsUrl}/${item._id}`, item)
  	.map(res => res.json)
  	.catch(this.handleError);
  }

  deleteItem(item): Observable<Object>{
    return this.http.delete(`${this.itemsUrl}/${item._id}`)
    .map(res => res.json)
    .catch(this.handleError);
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
