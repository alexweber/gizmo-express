import chai = require('chai');
import sinon = require('sinon');

const expect = chai.expect;

import validUser  from '../fixtures/validUser';
import UserController from '../../src/controllers/userController';

let controller;

describe('controllers/userController', () => {

  beforeEach(function () {
    controller = new UserController();
  });

  it('should exist', function () {
    expect(UserController).to.exist;
  });

  it('should be a function', function () {
    expect(UserController).to.be.a('function');
  });

  it('should be instantiable', function () {
    expect(controller).to.exist;
    expect(controller).to.be.a('object');
  });

  describe('load()', () => {
    let promise;

    beforeEach(function () {
      promise = sinon.stub(controller, 'load').returnsPromise();
    });

    afterEach(function () {
      controller.load.restore();
    });

    it('loads a single record', function () {
      const a = validUser();
      promise.resolves(a);
      return controller.load({}).then(res => {
        sinon.assert.calledWith(promise, {});
        expect(res).to.equal(a);
      });
    });
  });
});
