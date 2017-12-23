const sinon = require('sinon');
const expect = require('chai').expect;
const mongoose = require('mongoose');
require('sinon-mongoose');

//Object under test
const Item = require('../item.model');
const itemCtrl = require('../item.controller');
const itemsSnapshot = require('./items-snapshot');

const _data = [
  {
    _id: '587a6d436da65aa7f484a135',
    pic: 'https://pbs.twimg.com/profile_images/720276641532870657/zONL97lB.jpg',
    type: 'legumi',
    __v: 0,
    name: {
      de: {
        main: 'Ravioli',
        spec: 'ricotta und spinat'
      },
      pl: {
        main: 'Ravioli',
        spec: 'ricotta ze szpinakiem'
      },
      it: {
        main: 'Ravioli',
        spec: 'ricotta e spinaci'
      }
    }
  }
];

describe('item.controller', () => {
  // it('should find a List', (done) =>{
  // 	const mockRes = {'data':[{'_id': 'foo'}]}
  // 	sinon.mock(List)
  // 		.expects('find')
  // 		.yields(mockRes, 'SUCCESS');
  // 	listCtrl.getAllLists().then(function(res){
  // 		assert(res, 'SUCCESS');
  // 		done();
  // 	});
  // });
});

describe('The Item Controller', () => {
  it('should return a list of items', done => {
    //const mock = sinon.mock(Item);
    const mockRes = _data;
    const ItemMock = sinon
      .mock(Item)
      .expects('find')
      .yields(null, mockRes);

    Item.find((err, result) => {
      ItemMock.verify();
      ItemMock.restore();
      expect(err).to.not.exist;
      expect(result).to.be.an('array');
      done();
    });
  });
  it('should get a specific item');
  it('should post a new item');
  it('should put a new item');
  it('chould delete an item');
  it('should return a list of items following certain params');
});
