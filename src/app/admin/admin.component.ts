import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Router, ActivatedRoute} from '@angular/router';

import {UserService} from '../shared/user.service';
import {User} from '../user/user.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

	users:User[] = [];

  constructor(private service: UserService) { }

  ngOnInit() {

  	this.service.getAllUsers().subscribe( http_users => this.users = http_users);
	

  }

}
