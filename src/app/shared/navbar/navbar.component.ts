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

  	ngOnInit() {
  	}

	userId= this.authService.getUserID();
	get isLoggedIn() {
		return this.authService.isLoggedIn();
	}

	logout(){
		this.authService.logout();
		this.router.navigate(['/login']);
	}

}
