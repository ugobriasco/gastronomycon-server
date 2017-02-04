import { Component, OnInit } from '@angular/core';
declare var jQuery:any;


import {UserService} from '../../shared/user.service';
import {User} from '../user.model';
import {AdminService} from '../../shared/admin.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['../user.component.css']
})
export class UserListComponent implements OnInit {

users:User[] = [];
$user: User;
isAdmin = false;

  constructor(private userService: UserService, private adminService: AdminService) { }

  ngOnInit() {
  	this.userService.getAllUsers()
  	.subscribe( http_users => this.users = http_users);

  	this.userService.getUser()
  	.subscribe( http_user => {
  		let currentUser = http_user;
  		if(currentUser.role =="Admin") this.isAdmin = true;
  		console.log(this.isAdmin);
  	});
  }

  selectUser(user){
    return this.$user = user; 
  }




}
