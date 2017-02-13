# Grocerybot

##Intro
Grocerybot is a server-side application for suppoprting multilingual grocery lists. It provides and handles a customizable list of grocery products accessable via REST API.

Visit the [official page](http://gbot.matchyourtie.com), collaborate to the project on [GitHub](https://github.com/ugobriasco/grocerybot-server), or contact the author [Ugo Briasco](http://ugobriasco.me) on [Slack](https://matchyourtie.slack.com/messages/general/whats_new/).

##Release Notes
The v. 0.0.1-alpha1 of Grocerybot includes

1. Full user management
..+ email service
..+ basic profile
2. Full item-list management
..+ it supports the following languages: DE, PL, IT
3. REST API
..+ API Documentation
..+ JWT autentification compliant with the [ietf standards](https://tools.ietf.org/html/rfc6750 )
4. User Signup limitations option

##Framework
This a MEAN stack application, using angular2. It requires:
+ [mongo](https://docs.mongodb.com/getting-started/shell/)
+ [node](https://nodejs.org/en/)
+ [express](http://expressjs.com/)
+ [angular2](http://www.eloquentwebapp.com/setting-angular-2-environment-using-typescript-npm-webpack/)

It supports [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.22-1.

### Development server
Start the server side with `node server` and it is accessable via port `3000`
In a separate tab, start the client with `ng serve`.Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Setup
Install the dependancies with `npm install`.
Create the root user, by sending a `POST` request to `http://localhost:3000/api/signup` with the following body:
`{'email':'root@root.com','passowrd':'root','role: admin'}` (remove the entry point 'role' after the root user have been created)

### Frontend Test
* Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
* Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

### Client Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.
