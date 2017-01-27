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

  user: User;
  
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private service: UserService){}

  ngOnInit(){

  	this.init();
    console.log(this.user);
  	this.service.getUser().subscribe(user => {
      this.user = user;
    });
    

    
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
      password: '',
      profile: {
        name: '',
        avatar: '',
        cover: ''
      }
    }
  }


}
