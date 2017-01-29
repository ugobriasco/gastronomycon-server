import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-signup',
  template: `
	<div class="container">
		<form (ngSubmit) ="signup()">

		<h1>Join Us!</h1>

		 <div class="form-group">
		 	<label>Email</label>
		 	<input type="text" class="form-control" name="email" [(ngModel)] = "credentials.email"/>
	 	</div>
	 	<div class="form-group">
		 	<label>Password</label>
		 	<input type="password" class="form-control" name="password" [(ngModel)] = "credentials.password"/>
	 	</div>


	 	<!--messages-->
		<div class="alert alert-danger" *ngIf="errorMessage">{{errorMessage}}</div>

	 	<div>
	 		<button type="submit"class="btn btn-primary">Signup</button>
	 	</div>
		</form>
	</div>

  `,
  styles: [``]
})
export class SignupComponent implements OnInit {

	credentials = {email: '', password:''};
	errorMessage: string = '';


  constructor( private service: AuthService, private router: Router) { }


  ngOnInit() {
  }

  signup(){
  	this.service.signup(this.credentials.email, this.credentials.password)
  	.subscribe(
  		data => {this.router.navigate(['']); console.log(data);}, 
  		err => {this.errorMessage = err; console.log(err);}
  	);
  }

}