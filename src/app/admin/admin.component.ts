import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Router, ActivatedRoute} from '@angular/router';

import {UserService} from '../shared/user.service';
import {AdminService} from '../shared/admin.service';

import {User} from '../user/user.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

	users:User[] = [];
	signupCode = {'name':'aa','value':'aa', 'enabled': true};
  errorMessage = '';
  successMessage = '';

  constructor(private userService: UserService, private adminService: AdminService ) { }

  ngOnInit() {
  	
  	this.adminService.getSignupCode().subscribe(http_setting => this.signupCode = http_setting);

  }

  setSignupCode(){
    console.log(this.signupCode);
    let setting = {
      "value": this.signupCode.value,
      "enabled": this.signupCode.enabled

    }
    this.adminService.setSignupCode(setting)
    .subscribe(
      signupCode => {console.log(signupCode);},
      err => {console.log(err);}
      );

  }

  // setSignupCode(){
  //   this.errorMessage = '';
  //   this.successMessage = '';

  //   this.adminService.setSignupCode(this.signupCode.value, this.signupCode.enabled)
  //   .subscribe(
  //     signupCode => {
  //       this.successMessage = 'signupCode modified';
  //       this.clearMessages();
  //   },
  //   err =>{
  //     this.errorMessage = err;
  //     console.log(err);
  //     this.clearMessage();
  //   });

  // };



}
