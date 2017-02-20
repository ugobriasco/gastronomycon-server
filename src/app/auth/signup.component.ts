import { Component, OnInit } from '@angular/core';

import {Router} from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { AdminService } from '../shared/admin.service';
import { ValidationService } from '../shared/validation.service';




@Component({
  selector: 'app-signup',
  template: `
	<div class="container">
		<div class="row">
			<div class="col-md-6 col-md-offset-3">
				<form (ngSubmit) ="signup()">

					<h1>Join Us!</h1>

					 <div class="form-group">
					 	
					 	<input type="text" class="form-control" name="email" placeholder="Email"[(ngModel)] = "credentials.email"/>
				 	</div>
				 	<div class="form-group">
					 	
					 	<input type="password" class="form-control" placeholder="Super secret password" name="psw1" [(ngModel)] = "credentials.psw1"/>
				 	</div>
           <div class="form-group" *ngIf ="credentials.psw1">
             
             <input type="password" class="form-control" placeholder="Repeat password" name="psw2" [(ngModel)] = "credentials.psw2"/>
           </div>

				 	<div class="form-group" *ngIf="code.enabled">
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
		</div>
		
	</div>

  `,
  styles: [`
	.container{
  		margin-top: 5%;
  		
  	}

  `]
})
export class SignupComponent implements OnInit {

	credentials = {email: '', psw1:'', psw2:'', signupCode: ''};
	errorMessage: string = '';
	code = {'name':'','value':'', 'enabled': true};


  constructor( 
  	private router: Router,
  	private authService: AuthService, 
  	private adminService: AdminService,
  	private valService: ValidationService

  	) { }


  ngOnInit() {
  	this.adminService.getSignupCode().subscribe(http_setting => this.code = http_setting);
  	
  }

  signup(){
  	if(this.valService.emailValidator(this.credentials.email) == false) return this.errorMessage ="The email is not valid";
  	if(this.credentials.psw1 =="") return this.errorMessage ="Please enter a password";
    if(this.credentials.psw1 != this.credentials.psw2) return this.errorMessage = "The passwords are not matching";
  	
  	this.authService.signup(this.credentials.email, this.credentials.psw1, this.credentials.signupCode)
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
