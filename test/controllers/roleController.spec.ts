import chai = require('chai');
import sinon = require('sinon');

// Mongoose mocking.
import mongoose = require('mongoose');
const Mockgoose = require('mockgoose').Mockgoose;
const mockgoose = new Mockgoose(mongoose);

const expect = chai.expect;

import Role from '../../src/models/role';
import validRoles from '../fixtures/validRoles';
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

  it('should project values', function () {
    expect(RoleController.projection).to.equal('-__v');
  });

  describe('mongoose calls', function () {
    before(done => {
      mockgoose.prepareStorage().then(function () {
        mongoose.connect('mongodb://example.com/TestingDB', function (err) {
          done(err);
        });
      });
    });

    after(done => {
      mongoose.disconnect(function (err) {
        done(err);
      });
    });

    beforeEach(done => {
      mockgoose.helper.reset().then(() => {
        done()
      });
    });

    describe('create()', function () {
      it('inserts new records', function () {
        const r = validRoles()[0];
        return controller.create(r).then(role => {
          expect(role).to.exist.and.be.an('object');
          expect(role).to.have.property('__v');
          expect(role).to.have.property('name');
          expect(role).to.have.property('slug');
          expect(role).to.have.property('_id');
          expect(role.name).to.deep.equal(r.name);
          expect(role.slug).to.deep.equal(r.slug);
          expect(role.__v).to.deep.equal(0);
        });
      });

      it('when inserting, returns a full-fledged mongoose document by default', function () {
        const r = validRoles()[0];
        return controller.create(r).then(user => {
          expect(user).to.respondTo('save');
        });
      });

      it('when inserting, returns a plain object if specified', function () {
        const r = validRoles()[0];
        return controller.create(r, true).then(user => {
          expect(user).to.not.respondTo('save');
        });
      });
    });

    describe('load()', function () {
      it('returns null when no records match', function () {
        return controller.load().then(res => {
          expect(res).to.be.null;
        });
      });

      it('loads a record when it exists', function () {
        const r = validRoles()[0];
        return controller.create(r).then(role => {
          return controller.load(role._id).then(res => {
            expect(res).to.exist.and.be.an('object');
            expect(res).to.have.property('__v');
            expect(res).to.have.property('name');
            expect(res).to.have.property('slug');
            expect(res).to.have.property('_id');
            expect(res.name).to.deep.equal(r.name);
            expect(res.slug).to.deep.equal(r.slug);
            expect(res._id).to.deep.equal(role._id);
          });
        });
      });

      it('loads a full-fledged mongoose document by default', function () {
        const r = validRoles()[0];
        return controller.create(r).then(role => {
          return controller.load(role._id).then(res => {
            expect(res).to.respondTo('save');
          });
        });
      });

      it('loads a plain object if specified', function () {
        const r = validRoles()[0];
        return controller.create(r).then(role => {
          return controller.load(role._id, true).then(res => {
            expect(res).to.not.respondTo('save');
          });
        });
      });
    });

    describe('loadAll()', function () {
      it('returns an empty array when no records exists', function () {
        return controller.loadAll().then(res => {
          expect(res).to.be.an('array');
          expect(res.length).to.equal(0);
        });
      });

      it('returns array or records when they exist', function () {
        const r = validRoles();
        return controller.create(r).then(role => {
          return controller.loadAll().then(res => {
            expect(res).to.be.an('array');
            expect(res.length).to.equal(r.length);
          });
        });
      });

      it('returns full-fledged mongoose documents by default', function () {
        const r = validRoles();
        return controller.create(r).then(role => {
          return controller.loadAll().then(res => {
            expect(res[0]).to.respondTo('save');
          });
        });
      });

      it('returns plain objects if specified', function () {
        const r = validRoles();
        return controller.create(r).then(role => {
          return controller.loadAll(true).then(res => {
            expect(res[0]).to.not.respondTo('save');
          });
        });
      });
    });

    describe('remove()', function () {
      it('returns an empty promise', function () {
        return controller.remove().then(res => {
          expect(res).to.equal(null);
        });
      });

      it('removes record when it exists', function () {
        const r = validRoles()[0];
        return controller.create(r).then(role => {
          return controller.load(role._id).then(res => {
            return controller.remove(res._id).then(() => {
              return controller.load(role._id).then(res => {
                expect(res).to.be.null;
              });
            });
          });
        });
      });
    });

    describe('update()', function () {
      it('returns null when no records match', function () {
        return controller.update().then(res => {
          expect(res).to.deep.equal(null);
        });
      });

      it('updates a record when it exists', function () {
        const r = validRoles()[0];
        return controller.create(r).then(role => {
          return controller.load(role._id).then(res => {
            const newslug = 'sluggerino';
            return controller.update(res._id, { slug: newslug }).then(res => {
              expect(res).to.exist.and.be.an('object');
              expect(res).to.have.property('__v');
              expect(res).to.have.property('name');
              expect(res).to.have.property('slug');
              expect(res).to.have.property('_id');
              expect(res.name).to.deep.equal(r.name);
              expect(res.slug).to.deep.equal(newslug);
              expect(res._id).to.deep.equal(role._id);
            });
          });
        });
      });

      it('returns a full-fledged mongoose document by default', function () {
        const r = validRoles()[0];
        return controller.create(r).then(role => {
          return controller.load(role._id).then(res => {
            const newslug = 'sluggerino';
            return controller.update(res._id, { slug: newslug }).then(res => {
              expect(res).to.respondTo('save');
            });
          });
        });
      });

      it('returns a plain object if specified', function () {
        const r = validRoles()[0];
        return controller.create(r).then(role => {
          return controller.load(role._id).then(res => {
            const newslug = 'sluggerino';
            return controller.update(res._id, { slug: newslug }, true).then(res => {
              expect(res).to.not.respondTo('save');
            });
          });
        });
      });
    });

    describe('save()', function () {
      it('returns null when no records match', function () {
        return controller.save().then(res => {
          expect(res).to.deep.equal(null);
        });
      });

      it('updates a record when it exists', function () {
        const r = validRoles()[0];
        return controller.create(r).then(role => {
          return controller.load(role._id).then(res => {
            const newslug = 'sluggerino';
            return controller.save({ _id: res._id }, { slug: newslug }).then(res => {
              expect(res).to.exist.and.be.an('object');
              expect(res).to.have.property('__v');
              expect(res).to.have.property('name');
              expect(res).to.have.property('slug');
              expect(res).to.have.property('_id');
              expect(res.name).to.deep.equal(r.name);
              expect(res.slug).to.deep.equal(newslug);
              expect(res._id).to.deep.equal(role._id);
            });
          });
        });
      });

      it('when updating an existing record returns a full-fledged mongoose document by default', function () {
        const r = validRoles()[0];
        return controller.create(r).then(role => {
          return controller.load(role._id).then(res => {
            const newslug = 'sluggerino';
            return controller.save({ _id: res._id }, { slug: newslug }).then(res => {
              expect(res).to.respondTo('save');
            });
          });
        });
      });

      it('when updating an existing record returns a plain object if specified', function () {
        const r = validRoles()[0];
        return controller.create(r).then(role => {
          return controller.load(role._id).then(res => {
            const newslug = 'sluggerino';
            return controller.save({ _id: res._id }, { slug: newslug }, false, true).then(res => {
              expect(res).to.not.respondTo('save');
            });
          });
        });
      });

      it('creates a new record if specified', function () {
        const r = validRoles()[0];
        return controller.save({}, r, true).then(res => {
          expect(res).to.exist.and.be.an('object');
          expect(res).to.have.property('__v');
          expect(res).to.have.property('name');
          expect(res).to.have.property('slug');
          expect(res).to.have.property('_id');
          expect(res.name).to.deep.equal(r.name);
          expect(res.slug).to.deep.equal(r.slug);
          return controller.load(res._id).then(res2 => {
            expect(res2).to.exist;
            expect(res2._id).to.deep.equal(res._id);
          });
        });
      });

      it('when updating an existing record returns a full-fledged mongoose document by default', function () {
        const r = validRoles()[0];
        return controller.create(r).then(role => {
          return controller.load(role._id).then(res => {
            const newslug = 'sluggerino';
            return controller.save({ _id: res._id }, { slug: newslug }, true).then(res => {
              expect(res).to.respondTo('save');
            });
          });
        });
      });

      it('when updating an existing record returns a plain object if specified', function () {
        const r = validRoles()[0];
        return controller.create(r).then(role => {
          return controller.load(role._id).then(res => {
            const newslug = 'sluggerino';
            return controller.save({ _id: res._id }, { slug: newslug }, true, true).then(res => {
              expect(res).to.not.respondTo('save');
            });
          });
        });
      });
    });

    describe('find()', function () {
      let spy;

      beforeEach(function () {
        spy = sinon.spy(Role, 'find');
      });

      afterEach(function () {
        Role.find['restore']();
      });

      it('returns an empty array when no records match', function () {
        return controller.find({}).then(res => {
          expect(res).to.be.an('array');
          expect(res.length).to.equal(0);
        });
      });

      it('calls Model.find() with the expected parameters', function () {
        const params = {
          filters: {
            email: 'alex@test.com'
          },
          select: RoleController.projection
        };
        return controller.find(params).then(() => {
          expect(spy.calledOnce).to.equal(true);

          const options = controller.getPaginationOptions(params);
          expect(spy.calledWith(params.filters, options)).to.equal(true);
        });
      });
    });
  });
});
