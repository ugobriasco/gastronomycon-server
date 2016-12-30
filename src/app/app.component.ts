import { Component, OnInit } 	from '@angular/core';
import { Router } 				from '@angular/router';
import { Http } 				from '@angular/http';
import { AuthService } 			from './shared/auth.service';
import { UserService } 			from './shared/user.service';

@Component({
  selector: 'app-root',
  template: `
<nav class="navbar navbar-inverse">
	<div class="container-fluid">
	<div class="navbar-header">
	  <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse-1" aria-expanded="false">
	    <span class="sr-only">Toggle navigation</span>
	    <span class="icon-bar"></span>
	    <span class="icon-bar"></span>
	    <span class="icon-bar"></span>
	  </button>
	  <a href="./" class="navbar-brand glyphicon glyphicon-home"></a>
	</div>

	<!-- Collect the nav links, forms, and other content for toggling -->
	<div class="collapse navbar-collapse" id="navbar-collapse-1">
	    <ul class="nav navbar-nav">
	    	
	    </ul>
	  	<ul class="nav navbar-nav navbar-right">
			<li *ngIf="!isLoggedIn"><a routerLink="/signup">Sign Up</a></li>
			<li *ngIf="!isLoggedIn"><a routerLink="/login">Login</a></li>
			<li *ngIf="isLoggedIn" class="dropdown">
				
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"> Welcome back, {{user}}! <span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><a href="#">Profile</a></li>
            <li><a href="#">User list</a></li>
            <li><a href="#">Items</a></li>
            <li role="separator" class="divider"></li>
            <li><a (click)="logout()" class="pointer">Logout</a></li>
          </ul>
      


			</li>
			<li *ngIf="isLoggedIn"></li>
		</ul>
	</div><!-- /.navbar-collapse -->
	</div><!-- /.container-fluid -->
</nav>

<router-outlet></router-outlet>
<footer class="text-center">
	<p>Grocerybot &copy; {{currentYear}} - by <a href="http://matchyourtie.com">matchyourtie</a></p>
</footer>


  `,
  styles: [`
	
	.pointer{
    cursor:pointer;
	}

	.white {color: whi}

  `]
})
export class AppComponent {
  	d = new Date();
	currentYear = this.d.getFullYear();

	user= 'GroceryUser';



	constructor(
		private authService: AuthService,
		private userService: UserService,
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
