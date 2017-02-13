import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from '../shared/auth.service';


@Component({
  selector: 'app-login',
  template: `
  	<div class="container">
	  	<div class="row">
	  		<div class="col-md-6 col-md-offset-3">
	  			<form (ngSubmit) ="login()">
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
				 		<button type="submit"class="btn btn-primary">Login</button>
				 	</div>
				</form>
	  		</div>
	  	</div>
	</div>


  `,
  styles: [`

  	.container{
  		margin-top: 10%;
  		
  	}
  `]
})
export class LoginComponent implements OnInit {

	credentials = {email: '', password:''};
	errorMessage: string = '';


  constructor( private service: AuthService, private router: Router) { }


  ngOnInit() {
  }

  login(){
  	this.service.login(this.credentials.email, this.credentials.password)
  	.subscribe(
  		data => {this.router.navigate(['items']); console.log(data);}, 
  		err => {this.errorMessage = err; console.log(err);}
  	);
  }

}
