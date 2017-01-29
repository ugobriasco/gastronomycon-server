import { Component, OnInit } from '@angular/core';


import {UserService} from '../../shared/user.service';
import {User} from '../user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['../user.component.css']
})
export class UserListComponent implements OnInit {

users:User[] = [];

  constructor(private service: UserService) { }

  ngOnInit() {

  	this.service.getAllUsers().subscribe( http_users => this.users = http_users);
	

  }


}
