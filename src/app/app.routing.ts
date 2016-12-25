import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


import { LandingComponent } from './landing/landing.component';


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
//{
	//path: 'login', 
	//component: LoginComponent
//},


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