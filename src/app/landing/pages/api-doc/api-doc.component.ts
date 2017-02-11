import { Component, OnInit } from '@angular/core';
import { Http }      from '@angular/http';

@Component({
  selector: 'app-api-doc',
  templateUrl: './api-doc.component.html',
  styleUrls: ['./api-doc.component.css']
})
export class ApiDocComponent implements OnInit {

	private apiUrl: string = 'http://localhost:3000/api/';

	apiDoc = [];
	route = [];
	$route = {};




  constructor(private http: Http) {
  	this.http.get(this.apiUrl)
  	.subscribe(res => {this.apiDoc = res.json().apiDoc; console.log(this.apiDoc)});

   }

  ngOnInit() {
  	this.$route = this.route[0];
  }
  selectRoute(route){
    return this.$route = route;
  }

  /*
  STYLE classes avaiable:

  default
  muted
  primary
  success
  info
  warnindg
  danger

   */

  getReqTypeColor(reqType: string){
  	if(reqType =="GET") return "label-primary";
    if(reqType =="POST") return "label-warning";
    if(reqType =="PUT") return "label-info";
    if(reqType =="DELETE") return "label-danger";
  	else return "label-default";
  }

  getResStatusColor(status: number){
    if([200, 201].indexOf(status) !== -1) return "text-success";
    if([404, 400].indexOf(status) !== -1) return "text-danger";
    else return "text-muted"
  }

  

}
