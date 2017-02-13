import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Router, ActivatedRoute} from '@angular/router';

import {UserService} from '../shared/user.service';
import {User} from './user.model';
declare var jQuery:any;


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
  	this.service.getUser().subscribe(user => {
      this.user = user;
    });
    

    
  }

  updateUser(){
  	this.errorMessage = '';
  	this.successMessage = '';

  	this.service.updateCurrentUser(this.user)
  	.subscribe(
  		user => {
  			this.successMessage = 'Profile updated';
        this.clearMessages();
        jQuery("#editModal").modal("hide");
        
  		},
  		err => {
  			this.errorMessage = err;
  			console.log(err);
        this.clearMessages();
        jQuery("#editModal").modal("hide");
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

  private clearMessages() {
    setTimeout(() => {
      this.successMessage = '';
      this.errorMessage   = '';
    }, 3000);
  }


}
