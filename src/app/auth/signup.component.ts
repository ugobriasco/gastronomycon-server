import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
             
             <input type="password" class="form-control" placeholder="Repeat password"name="psw2" [(ngModel)] = "credentials.psw2"/>
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

		<div class="row">
			<div class="col-md-6 col-md-offset-3">
				<form [formGroup]="userForm" (submit)="signup()">
				  <label for="email">Email</label>
				  <input formControlName="email" id="email" />
				  <control-messages [control]="userForm.controls.email"></control-messages>

				  <label for="psw1">Password</label>
				  <input type="password formControlName="psw1" id="psw1"/>
				  <label for="psw2">Repeat password</label>
				  <input type="password" formControlName="psw2" id="psw2"/>


				  <div class="form-group" *ngIf="code.enabled">
				 	<label for="signupCode">Signup Code</label>
				 	<input formControlName ="signupCode" id="signupCode"/>
				  </div>

				  <button type="submit" [disabled]="!userForm.valid">Submit</button>
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
	userForm: any;


  constructor( 
  	private authService: AuthService, 
  	private adminService: AdminService,
  	private router: Router,
  	private formBuilder: FormBuilder

  	) {
  	this.userForm = this.formBuilder.group({
  		'email': ['',[Validators.required, ValidationService.emailValidator]],
  		'psw1': '',
  		'psw2': '',
  		'signupCode':''
  	});



  	 }


  ngOnInit() {
  	this.adminService.getSignupCode().subscribe(http_setting => this.code = http_setting); 	
  }



  signup(){

    if(this.credentials.psw2 != this.credentials.psw1) return this.errorMessage = "The passwords are not matching";  	
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
