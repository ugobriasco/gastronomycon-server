const async = require('async');
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const should = chai.should();
const expect = chai.expect;
const t = require('./testdata.utils');

chai.use(chaiHttp);
const host = t.host;

describe('/item & /item/:ObjID', () => {
  describe('a user not registered (i.e. Public routes)', () => {
    describe('GET', () => {
      it('should get the list of all items'); //probably will change in the futue
      it('should get a single item');
    });
    describe('POST', () => {
      it('should NOT be able to add a new item');
    });
    describe('PUT', () => {
      it('should not be able to modify an existing item');
    });
    describe('DELETE', () => {
      it('should not be able to delete an existing item');
    });
  });

  describe('a user registered (i.e. Private routes)', () => {
    describe('GET', () => {
      it('should get the list of all items'); //probably will change in the futue
      it('should get a single item');
    });
    describe('POST', () => {
      it('should be able to add a new item');
    });
    describe('PUT', () => {
      it('should be able to modify an existing item');
    });
    describe('DELETE', () => {
      it('should be able to delete an existing item');
    });
  });
});

// 	.post(authCtrl.isAuthenticated, itemCtrl.postItem)
// 	.get(itemCtrl.getAllItems);
// describe('/item/:objID')
// 	.get(itemCtrl.getItem)
// 	.put(authCtrl.isAuthenticated, itemCtrl.putItem)
// 	.delete(authCtrl.isAuthenticated, itemCtrl.deleteItem);
