import { Component, OnInit } 	from '@angular/core';
import { Router } 				from '@angular/router';
import { Http } 				from '@angular/http';
import { AuthService } 			from './shared/auth.service';
import { UserService } 			from './shared/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  	d = new Date();
	currentYear = this.d.getFullYear();


	constructor(
		private authService: AuthService,
		private router: Router
		){}

	ngOnInit(){

	}

	get isLoggedIn() {
		return this.authService.isLoggedIn();
	}

	logout(){
		this.authService.logout();
		this.router.navigate(['/login']);
	}
}
