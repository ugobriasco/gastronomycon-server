import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';

import { routing } from './app.routing';
import { AuthService } from './shared/auth.service';
import { UserService } from './shared/user.service';
import { ItemsService } from './items/items.service';
import { AdminService } from './shared/admin.service';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './auth/login.component';
import { SignupComponent } from './auth/signup.component';
import { ItemsComponent } from './items/items.component';
import { SearchPipe} from './items/items.filterItem.pipe';
import { OrderBy } from './shared/pipes/orderby.pipe';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { AdminComponent } from './admin/admin.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { ResetPasswordComponent} from './auth/reset-password.component';
import { ApiDocComponent } from './landing/pages/api-doc/api-doc.component';





//Since RC6, all Directives and Pipes should be moved to module's declarations.



@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    UserComponent,
    LoginComponent,
    SignupComponent,
    ItemsComponent,
    SearchPipe,
    OrderBy,
    NavbarComponent,
    FooterComponent,
    AdminComponent,
    UserListComponent,
    ResetPasswordComponent,
    ApiDocComponent
     
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    AuthService,
    UserService,
    ItemsService,
    AdminService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
