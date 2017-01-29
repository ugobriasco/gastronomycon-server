import { Component, OnInit } from '@angular/core';
import { Router } 				from '@angular/router';
import { Http } 				from '@angular/http';
import { AuthService } 			from '../auth.service';
import { UserService } 			from '../user.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
	constructor(
		private authService: AuthService,
		private userService: UserService,
		private router: Router
		){}

	user: any;
	userRole: string;


  	ngOnInit() {
  	this.userService.getUser().subscribe(user => {
      this.user = user;
      this.userRole = this.user.role;
    });
  	}
  	
	get isLoggedIn() {
		return this.authService.isLoggedIn();

	}

	get isAdmin(){
		if(this.userRole == 'Admin') return true;
		else return false;

	}

	logout(){
		this.authService.logout();
		this.router.navigate(['/login']);
	}

}
