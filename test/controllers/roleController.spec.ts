import chai = require('chai');
import sinon = require('sinon');

const expect = chai.expect;

import { validRole }  from '../fixtures';
import RoleController from '../../src/controllers/roleController';

let controller;

describe('controllers/roleController', () => {

  beforeEach(function () {
    controller = new RoleController();
  });

  it('should exist', function () {
    expect(RoleController).to.exist;
  });

  it('should be a function', function () {
    expect(RoleController).to.be.a('function');
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
      const a = validRole();
      promise.resolves(a);
      return controller.load({}).then(res => {
        sinon.assert.calledWith(promise, {});
        expect(res).to.equal(a);
      });
    });
  });
});
