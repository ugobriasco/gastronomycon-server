import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; //for using the banana in the box
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';
import { AppComponent } from './app.component';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';



@NgModule({
  imports: [ BrowserModule, FormsModule, HttpModule, routing ],
  declarations: [ AppComponent ], //declare all the components in use!
  providers: [],
  bootstrap: [ AppComponent ] //starting point
})
export class AppModule {}
