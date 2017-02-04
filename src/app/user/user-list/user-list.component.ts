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
isAdmin: boolean;
deleteOrder: boolean;

  constructor(private userService: UserService, private adminService: AdminService) { }

  ngOnInit() {
  	this.userService.getAllUsers()
  	.subscribe( http_users => this.users = http_users);

    this.deleteOrder = false;

  	this.userService.getUser()
  	.subscribe( http_user => {
  		let currentUser = http_user;
  		if(currentUser.role =="Admin") this.isAdmin = true;
      else this.isAdmin = false;
  		console.log(this.isAdmin);
  	});
  }

  selectUser(user){
    return this.$user = user; 
  }

  updateUser($user: User){
    this.userService.updateUser($user)
    .subscribe(
      user => {
        console.log($user);
        jQuery("#editModal").modal("hide");
      },
      err => {
        console.log(err);
        jQuery("#editModal").modal("hide");
      }


      )

  }

  deleteUser($user: User){
    this.userService.deleteUser($user)
    .subscribe( user => {
      console.log('user deleted');
      location.reload();

    },
    err => {
      console.log(err);
      jQuery("#editModal").modal("hide");

    });
    jQuery("#editModal").modal("hide");

  }




}
