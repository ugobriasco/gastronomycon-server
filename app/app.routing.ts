import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


export const routes: Routes = [
{
	path: '', 
	redirectTo: '/', 
	pathMatch: 'full'
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
//{
//	path: 'login', 
//	component: LoginComponent
//},




];

export const routing = RouterModule.forRoot(routes);