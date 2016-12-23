//Require the dev-dependencies
const 	chai = require('chai'),
		chaiHttp = require('chai-http');

const User = require('../user/user.model');

let should = chai.should();
let host = "http://localhost:3000/api";
//let magic = new Date().toISOString();
let magic = 'foo';

chai.use(chaiHttp);
//Our parent block


describe('/api/signin', () =>{
	it('it should register a new user returning a 201 and a token'), (done) => {
		let user1 = {email: magic, password: magic}

		chai.request(host)
		.post('/signin')
		.set('content-type', 'application/x-www-form-urlencoded')	
		.send(user1)
		.end((err, res) => {
			res.should.have.status(201);
			//res.body.should.be.a('object');
			//res.body.should.have.property('token');
			done();
		});
	}
	it('it should respond 422 for signup without email'), (done) => {
		let user = {password: magic}

		chai.request(host)
		.post('/signin')
		.send(user)
		.end((err, res) => {
			res.should.have.status(422);
			//res.body.should.not.have.property('token');
			done();
		});
	}
	it('it should respond 422 with wrong req.body'), (done) => {
		let user = {apples: 2}

		chai.request(host)
		.post('/signin')
		.send(user)
		.end((err, res) => {
			res.should.have.status(422);
			//res.body.should.not.have.property('token');
			done();
		});
	}
	it('it should respond 422 for signup without password'), (done) => {
		let user = {email: magic}

		user.save((err, user) =>{
			chai.request(host)
				.post('/signin')
				.send(user)
				.end((err, res) => {
					res.should.have.status(422);
					//res.body.should.not.have.property('token');
					done();
		});

		});

	}
	it('it should not register a already existing user, sending back a 422'), (done) => {
		let user = {email: magic, password: magic}

		chai.request(host)
		.post('/signin')
		.send(user)
		.end((err, res) => {
			res.should.have.status(422);
			res.body.should.not.have.property('token');
			done();
		});
	}

});

describe('/user', () => {
  it('it should return all the users', (done) => {
    chai.request(host)
        .get('/user')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
          done();
        });
  });
});

describe('/login', () => {
  it('it should deny access to a user with wrong credentials', (done) => {
    chai.request(host)
        .post('/login')
        .end((err, res) => {
            res.should.have.status(400);
          done();
        });
  });
});


