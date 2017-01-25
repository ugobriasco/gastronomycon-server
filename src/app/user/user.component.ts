import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Router, ActivatedRoute} from '@angular/router';

import {UserService} from '../shared/user.service';
import {User} from './user.model';


@Component({
  selector: 'app-user',
  templateUrl:'./user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: any = {};
  a_user: any = {};
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private service: UserService){}

  ngOnInit(){
  	this.init();
   
  	this.service.getUser().subscribe(a_user => this.a_user = a_user);
    console.log(this.a_user);

    
  }

  updateUser(){
  	this.errorMessage = '';
  	this.successMessage = '';

  	this.service.updateUser(this.user)
  	.subscribe(
  		user => {
  			this.successMessage = 'Profile updated';
        
  		},
  		err => {
  			this.errorMessage = err;
  			console.log(err);
  		}


  		)
  }

  private init(): void {
    this.user = {
      email: '',
      role: '',
      profile: {
        name: '',
        avatar: '',
        cover: ''
      }
    }
  }


}
