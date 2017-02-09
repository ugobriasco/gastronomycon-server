import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from '../shared/auth.service';


@Component({
  selector: 'app-reset-password',
  template: `
  	<div class="container">
	  	<div class="row">
	  		<div class="col-md-6 col-md-offset-3">
	  			<form (ngSubmit) ="reset()">
					<div class="form-group">
					 	<label>Password</label>
					 	<input type="password" class="form-control" name="email" [(ngModel)] = "credentials.psw1"/>
				 	</div>
				 	<div class="form-group">
					 	<label>Repete password</label>
					 	<input type="password" class="form-control" name="password" [(ngModel)] = "credentials.psw2"/>
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
export class ResetPasswordComponent implements OnInit {

	credentials = {pws1: '', psw2:''};
	errorMessage: string = '';


  constructor( private service: AuthService, private router: Router) { }


  ngOnInit() {
  }

  reset(){
  	
  }

}
