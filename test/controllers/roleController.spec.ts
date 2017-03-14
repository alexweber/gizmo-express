import chai = require('chai');
import sinon = require('sinon');

// Mongoose mocking.
import mongoose = require('mongoose');
const Mockgoose = require('mockgoose').Mockgoose;
const mockgoose = new Mockgoose(mongoose);

const expect = chai.expect;

import validRole from '../fixtures/validRole';
import RoleController from '../../src/controllers/roleController';

let controller;

describe('controllers/roleController', function () {

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
    expect(controller).to.be.an('object');
  });

  describe('mongoose calls', function () {
    before(done => {
      mockgoose.prepareStorage().then(function () {
        mongoose.connect('mongodb://example.com/TestingDB', function (err) {
          done(err);
        });
      });
    });

    beforeEach(done => {
      mockgoose.helper.reset().then(() => {
        done()
      });
    });

    describe('create()', function () {
      it('inserts new records', function () {
        const r = validRole();
        return controller.create(r).then(role => {
          expect(role).to.exist.and.be.an('object');
          expect(role).to.have.property('__v');
          expect(role).to.have.property('name');
          expect(role).to.have.property('slug');
          expect(role).to.have.property('_id');
          expect(role.name).to.deep.equal(r.name);
          expect(role.slug).to.deep.equal(r.slug);
        });
      });
    });

    describe('load()', function () {
      it('loads saved records', function () {
        return controller.load({})
      });
    });
  });
});
