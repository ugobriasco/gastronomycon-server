# Grocerybot
=============

## Intro
This is the server-side application of Grocerybot - a microservice for multilingual grocery lists. It provides and handles a customizable list of grocery products, accessable via REST API. The default client application can be found [here](https://github.com/ugobriasco/grocerybot-cli).

Visit the [official page](http://46.101.201.71:3000), collaborate to the project on [GitHub](https://github.com/ugobriasco/grocerybot-server), or contact the author [Ugo Briasco](http://ugobriasco.me) on [Slack](https://matchyourtie.slack.com/messages/general/whats_new/).

## Release Notes
The v. 0.0.1 of Grocerybot includes

1. Full user management
..+ email service
..+ basic profile
2. Full item-list management
..+ it supports the following languages: DE, PL, IT
3. REST API
..+ API Documentation
..+ JWT autentification compliant with the [ietf standards](https://tools.ietf.org/html/rfc6750 )
4. User Signup limitations option

## Framework
This a RESTful API based on:
+ [mongo](https://docs.mongodb.com/getting-started/shell/)
+ [node](https://nodejs.org/en/)
+ [express](http://expressjs.com/)

## Usage
Please refer to the [API documentation](http://gb.matchyourtie.com/documentation) for released versions, or check [here](https://github.com/ugobriasco/grocerybot-server/blob/master/server/api/api-doc.json).

## Development server
Start the server side with `npm start` and it is accessable via port `3000`(it requires a target mongo database running). The API documentation is accessable under `http://localhost:3000/api/`

### Setup
Install the dependancies with `npm install`.
Create the root user, by sending a `POST` request to `http://localhost:3000/api/signup` with the following body (x-www-form-urlencoded):
`{"email":"root@root.com","passowrd":"root","role": "Admin"}` (remove the entry point 'role' in the [`postSignUp`](https://github.com/ugobriasco/grocerybot-server/blob/master/server/auth/auth.controller.js) method, after the root user has been created)

Optional -  SignupCode
In order to control the signup, it is possible to provide e signup code option, which -if enabled- requires a signup code by the signup. This option can be created by an admin user as following:
`POST http://localhost/api/settings`
`{"name": "signupCode", "value": "foo"}`

### Test
Run `npm test` to execute the unit and integration tests. It requires the following ftramework:
*  [Mocha](https://mochajs.org/).
*  [Chai](http://chaijs.com).
*  [Sinon](http://sinonjs.org).

In order to check the current test coverage, run `npm coverage`, which requires [Istanbul](https://istanbul.js.org/).

Before running the tests make sure you are serving the app via `npm start`.

## Contributing
In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.

## License
[MIT](https://github.com/ugobriasco/grocerybot-server/blob/master/LICENSE.md)