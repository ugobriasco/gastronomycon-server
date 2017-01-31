import { Component, OnInit } from '@angular/core';


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
isAdmin = false;

  constructor(private userService: UserService, private adminService: AdminService) { }

  ngOnInit() {

  	this.userService.getAllUsers().subscribe( http_users => this.users = http_users);
  	
  }


}
