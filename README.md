# Gastronomycon

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/9551ffcba0e0422fa1b1a09985ebe09f)](https://www.codacy.com/app/ugobriasco/grocerybot-server?utm_source=github.com&utm_medium=referral&utm_content=ugobriasco/gastronomycon-server&utm_campaign=Badge_Grade)
[![Build Status](https://travis-ci.org/ugobriasco/gastronomycon-server.svg?branch=master)](https://travis-ci.org/ugobriasco/ggastronomycon-server)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## Intro

This is the server-side application of Gastronomycon - a microservice for multilingual groceries. It provides and handles groceries, accessable via REST API. The default client application can be found [here](https://github.com/ugobriasco/grocerybot-cli).

Visit the [official page](http://46.101.201.71:3000), collaborate to the project on [GitHub](https://github.com/ugobriasco/gastronomycon-server), or contact the author [Ugo Briasco](http://ugobriasco.me) on [Slack](https://matchyourtie.slack.com/messages/general/whats_new/).

## Framework

- [mongo](https://docs.mongodb.com/getting-started/shell/)
- [node](https://nodejs.org/en/)
- [express](http://expressjs.com/)

## Usage

Please refer to the [API documentation](https://github.com/ugobriasco/gastronomycon-server/wiki/API-v1.0-reference) for released versions, or check [here](https://github.com/ugobriasco/grocerybot-server/blob/master/server/api/v1.0/api-doc.json).

## Development

### Prerequisites

- node 8+
- npm 6+
- Nodemon 1.4+
- mongoDB 4+
- dependency-cruiser 4+ (for updating dependency graph)

### Setup

- Install dependencies

```bash
git clone git@github.com:ugobriasco/gastronomycon-server.git && cd gastronomycon-server
npm i
cp ./cfg.js.template ./cfg.js
mongod
npm start
```

- Create the root user, by sending a `POST` request to `http://localhost:3000/api/v1.0/signup` with the following body:
  `{"email":"ROOT_EMAIL","passowrd":"ROOT_PASSWORD","role": "Admin"}`

- Set `allow_set_role_on_signup: false` in `./cfg.js`. This prevents guest user to sign up as Admin.

- Optional - SignupCode
  In order to control the signup, it is possible to provide a signup code option, which -if enabled- requires a code during the the registration of a new user. This option can be created by an admin user as following:
  `POST http://localhost/api/settings`
  `{"name": "signupCode", "value": "foo"}`

### Test

Run `npm test` to execute the unit and integration tests. It requires the following ftramework:

- [Mocha](https://mochajs.org/).
- [Chai](http://chaijs.com).
- [Sinon](http://sinonjs.org).

In order to check the current test coverage, run `npm coverage`, which requires [Istanbul](https://istanbul.js.org/).

Before running the tests make sure you are serving the app via `npm start`.

### Architecture

Dependency graph [here](./dependencygraph.svg). For updating it, run:

```
sh ./script/plot-dependency-graph.sh
```

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.

## License

[MIT](https://github.com/ugobriasco/grocerybot-server/blob/master/LICENSE.md)
