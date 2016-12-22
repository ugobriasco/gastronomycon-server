import { Component } from '@angular/core';

@Component({
	selector:'app',
	template: `
	<header><nav class="navbar navbar-inverse"><div class="navbar-header"><a href="./" class="navbar-brand glyphicon glyphicon-home"></a></div></nav></header>
	<main><div class="jumbotron"><h2>Hello Dude</h2></div></main>
	<footer class="text-center">Copyright &copy; {{currentYear}}</footer>

	`, //use templateUrl for app.component.html
	styles:[`


	`]//use styleUrls:[] for app.component.css

})
export class AppComponent{

	d = new Date();
	currentYear = this.d.getFullYear();
}