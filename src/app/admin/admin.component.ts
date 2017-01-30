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
	signupCode = {'name':'','value':''};

  constructor(private userService: UserService, private adminService: AdminService ) { }

  ngOnInit() {
  	this.userService.getAllUsers().subscribe( http_users => this.users = http_users);
  	this.adminService.getSignupCode().subscribe(http_setting => this.signupCode = http_setting);

  }



}
