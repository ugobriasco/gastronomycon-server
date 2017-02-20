import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


import { LandingComponent } from './landing/landing.component';
import { SignupComponent } from './auth/signup.component';
import { LoginComponent } from './auth/login.component';
import { UserComponent } from './user/user.component';
import { ItemsComponent } from './items/items.component';
import { AdminComponent } from './admin/admin.component';
import { ApiDocComponent } from './landing/pages/api-doc/api-doc.component';

export const routes: Routes = [
{
	path: '', 
	redirectTo: '/landing', 
	pathMatch: 'full'
},
{
	path: 'landing',
	component: LandingComponent,
},
{
	path: 'login', 
	component: LoginComponent
},
{
	path: 'signup', 
	component: SignupComponent
},
{
	path: 'profile', 
	component: UserComponent
},
{
	path: 'items', 
	component: ItemsComponent
},
{
	path: 'admin', 
	component: AdminComponent
},
{
	path: 'documentation', 
	component: ApiDocComponent
},


//{
//	path: 'users',
//	component: UsersComponent,
//	 children: [
//		{path: '', component: UserListComponent},
//		{path: 'create', component: UserCreateComponent}, 
//		{path: ':id', component: UserSingleComponent}, //handles GET and DELETE
//		{path: ':id/edit', component: UserEditComponent},
//	] 
//},






];

export const routing = RouterModule.forRoot(routes);