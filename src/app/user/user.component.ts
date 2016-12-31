import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Router, ActivatedRoute} from '@angular/router';

import {UserService} from '../shared/user.service';
import {User} from './user.model';


@Component({
  selector: 'app-user',
  template: `
  		
		<div class="container">
			<div class="row">
				<div class="col-lg-3 col-sm-6">
		            <div class="card hovercard">
		                <div class="cardheader">

		                </div>
		                <div class="avatar">
		                    <img alt="" src="http://lorempixel.com/100/100/people/9/">
		                </div>
		                <div class="info">
		                    <div class="title">
		                        {{user.name}}
		                    </div>
		                    <div class="desc">{{user.email}}</div>
		                    <div class="desc">{{user.role}}</div>
		                </div>
		                <div class="bottom">
		                    <a class="btn btn-primary btn-twitter btn-sm" href="https://twitter.com/webmaniac">
		                        <i class="fa fa-twitter"></i>
		                    </a>
		                    <a class="btn btn-danger btn-sm" rel="publisher"
		                       href="https://plus.google.com/+ahmshahnuralam">
		                        <i class="fa fa-google-plus"></i>
		                    </a>
		                    <a class="btn btn-primary btn-sm" rel="publisher"
		                       href="https://plus.google.com/shahnuralam">
		                        <i class="fa fa-facebook"></i>
		                    </a>
		                    <a class="btn btn-warning btn-sm" rel="publisher" href="https://plus.google.com/shahnuralam">
		                        <i class="fa fa-behance"></i>
		                    </a>
		                </div>
		            </div>

		        </div>

			</div>
		</div>
  			
  `,
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

title = 'http app digest';

  user = {}

  constructor(private service: UserService){}

  ngOnInit(){
  	this.service.getUser()
  	.subscribe(user => this.user = user);
  }

}
