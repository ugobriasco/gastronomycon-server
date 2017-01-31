import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { AdminService } from '../shared/admin.service';



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

	 	<div class="form-group jumbotron" *ngIf="code.enabled">
		 	<label>Signup Code</label>
		 	<input type="text" class="form-control" name="signupCode" [(ngModel)] = "credentials.signupCode"/>
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

	credentials = {email: '', password:'', signupCode: ''};
	errorMessage: string = '';
	code = {'name':'aa','value':'aa', 'enabled': true};


  constructor( private authService: AuthService, private adminService: AdminService,private router: Router) { }


  ngOnInit() {
  	this.adminService.getSignupCode().subscribe(http_setting => this.code = http_setting);
  	console.log(this.code);
  }

  signup(){
  	this.authService.signup(this.credentials.email, this.credentials.password, this.credentials.signupCode)
  	.subscribe(
  		data => {this.router.navigate(['']); console.log(data);}, 
  		err => {this.errorMessage = err; console.log(err); this.clearMessages();}
  	);
  }

  private clearMessages() {
    setTimeout(() => {
      this.errorMessage   = '';
    }, 3000);
  }

}
