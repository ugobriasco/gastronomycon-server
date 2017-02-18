import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';

import { ValidationService } from '../shared/validation.service';


@Component({
	
	selector: 'app-signup',
	template: `

	<div class="row">
		<div class="col-md-offset-3 col-md-6 jumbotron">
			<h1>Join Us!</h1>
			<form [formGroup]="signupForm" (ngSubmit) = "signup(signupForm.value)">
				<div class="form-group">
					<input type="text" class="form-control" placeholder="Email" [formControl]="signupForm.controls['email.value']" />
				</div>
				<div class="form-group">
					<input type="password" class="form-control" placeholder="Password" [formControl]="signupForm.controls['password.value']" />
				</div>
				<button type="submit"></button>
			</form>
		</div>
	</div>

	`
})
export class SignupComponent implements OnInit {
	signupForm: any;
	constructor(private fb: FormBuilder) {
		this.signupForm = fb.group({
			'email':'',
			'password':''
		})
	}

	ngOnInit() {
		
	}

	signup(value: any){
		console.log(value);
	}


}