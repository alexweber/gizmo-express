import chai = require('chai');
import sinon = require('sinon');

// Mongoose mocking.
import mongoose = require('mongoose');
const Mockgoose = require('mockgoose').Mockgoose;
const mockgoose = new Mockgoose(mongoose);

const expect = chai.expect;

import User from '../../src/models/user';
import validUsers from '../fixtures/validUsers';
import UserController from '../../src/controllers/userController';

let controller;

describe('controllers/userController', function () {

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
    expect(controller).to.be.an('object');
  });

  it('should project values', function () {
    expect(UserController.projection).to.equal('-__v');
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
        const r = validUsers()[0];
        return controller.create(r).then(user => {
          expect(user).to.exist.and.be.an('object');
          expect(user).to.have.property('__v');
          expect(user).to.have.property('name');
          expect(user).to.have.property('id');
          expect(user).to.have.property('_id');
          expect(user.name).to.deep.equal(r.name);
          expect(user.id).to.deep.equal(r.id);
          expect(user.__v).to.deep.equal(0);
        });
      });

      it('when inserting, returns a full-fledged mongoose document by default', function () {
        const r = validUsers()[0];
        return controller.create(r).then(user => {
          expect(user).to.respondTo('save');
        });
      });

      it('when inserting, returns a plain object if specified', function () {
        const r = validUsers()[0];
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
        const r = validUsers()[0];
        return controller.create(r).then(user => {
          return controller.load(user._id).then(res => {
            expect(res).to.exist.and.be.an('object');
            expect(res).to.have.property('__v');
            expect(res).to.have.property('name');
            expect(res).to.have.property('id');
            expect(res).to.have.property('_id');
            expect(res.name).to.deep.equal(r.name);
            expect(res.id).to.deep.equal(r.id);
            expect(res._id).to.deep.equal(user._id);
          });
        });
      });

      it('loads a full-fledged mongoose document by default', function () {
        const r = validUsers()[0];
        return controller.create(r).then(user => {
          return controller.load(user._id).then(res => {
            expect(res).to.respondTo('save');
          });
        });
      });

      it('loads a plain object if specified', function () {
        const r = validUsers()[0];
        return controller.create(r).then(user => {
          return controller.load(user._id, true).then(res => {
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
        const r = validUsers();
        return controller.create(r).then(user => {
          return controller.loadAll().then(res => {
            expect(res).to.be.an('array');
            expect(res.length).to.equal(r.length);
          });
        });
      });

      it('returns full-fledged mongoose documents by default', function () {
        const r = validUsers();
        return controller.create(r).then(user => {
          return controller.loadAll().then(res => {
            expect(res[0]).to.respondTo('save');
          });
        });
      });

      it('returns plain objects if specified', function () {
        const r = validUsers();
        return controller.create(r).then(user => {
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
        const r = validUsers()[0];
        return controller.create(r).then(user => {
          return controller.load(user._id).then(res => {
            return controller.remove(res._id).then(() => {
              return controller.load(user._id).then(res => {
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
        const r = validUsers()[0];
        return controller.create(r).then(user => {
          return controller.load(user._id).then(res => {
            const newid = 'ididdy';
            return controller.update(res._id, { id: newid }).then(res => {
              expect(res).to.exist.and.be.an('object');
              expect(res).to.have.property('__v');
              expect(res).to.have.property('name');
              expect(res).to.have.property('id');
              expect(res).to.have.property('_id');
              expect(res.name).to.deep.equal(r.name);
              expect(res.id).to.deep.equal(newid);
              expect(res._id).to.deep.equal(user._id);
            });
          });
        });
      });

      it('returns a full-fledged mongoose document by default', function () {
        const r = validUsers()[0];
        return controller.create(r).then(user => {
          return controller.load(user._id).then(res => {
            const newid = 'ididdy';
            return controller.update(res._id, { id: newid }).then(res => {
              expect(res).to.respondTo('save');
            });
          });
        });
      });

      it('returns a plain object if specified', function () {
        const r = validUsers()[0];
        return controller.create(r).then(user => {
          return controller.load(user._id).then(res => {
            const newid = 'ididdy';
            return controller.update(res._id, { id: newid }, true).then(res => {
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
        const r = validUsers()[0];
        return controller.create(r).then(user => {
          return controller.load(user._id).then(res => {
            const newid = 'ididdy';
            return controller.save({ _id: res._id }, { id: newid }).then(res => {
              expect(res).to.exist.and.be.an('object');
              expect(res).to.have.property('__v');
              expect(res).to.have.property('name');
              expect(res).to.have.property('id');
              expect(res).to.have.property('_id');
              expect(res.name).to.deep.equal(r.name);
              expect(res.id).to.deep.equal(newid);
              expect(res._id).to.deep.equal(user._id);
            });
          });
        });
      });

      it('when updating an existing record returns a full-fledged mongoose document by default', function () {
        const r = validUsers()[0];
        return controller.create(r).then(user => {
          return controller.load(user._id).then(res => {
            const newid = 'ididdy';
            return controller.save({ _id: res._id }, { id: newid }).then(res => {
              expect(res).to.respondTo('save');
            });
          });
        });
      });

      it('when updating an existing record returns a plain object if specified', function () {
        const r = validUsers()[0];
        return controller.create(r).then(user => {
          return controller.load(user._id).then(res => {
            const newid = 'ididdy';
            return controller.save({ _id: res._id }, { id: newid }, false, true).then(res => {
              expect(res).to.not.respondTo('save');
            });
          });
        });
      });

      it('creates a new record if specified', function () {
        const r = validUsers()[0];
        return controller.save({}, r, true).then(res => {
          expect(res).to.exist.and.be.an('object');
          expect(res).to.have.property('__v');
          expect(res).to.have.property('name');
          expect(res).to.have.property('id');
          expect(res).to.have.property('_id');
          expect(res.name).to.deep.equal(r.name);
          expect(res.id).to.deep.equal(r.id);
          return controller.load(res._id).then(res2 => {
            expect(res2).to.exist;
            expect(res2._id).to.deep.equal(res._id);
          });
        });
      });

      it('when updating an existing record returns a full-fledged mongoose document by default', function () {
        const r = validUsers()[0];
        return controller.create(r).then(user => {
          return controller.load(user._id).then(res => {
            const newid = 'ididdy';
            return controller.save({ _id: res._id }, { id: newid }, true).then(res => {
              expect(res).to.respondTo('save');
            });
          });
        });
      });

      it('when updating an existing record returns a plain object if specified', function () {
        const r = validUsers()[0];
        return controller.create(r).then(user => {
          return controller.load(user._id).then(res => {
            const newid = 'ididdy';
            return controller.save({ _id: res._id }, { id: newid }, true, true).then(res => {
              expect(res).to.not.respondTo('save');
            });
          });
        });
      });
    });

    describe('findPaged()', function () {
      let paginationSpy, nullSpy, optionSpy, filterSpy;

      beforeEach(function () {
        paginationSpy = sinon.spy(User, 'paginate');
        nullSpy = sinon.spy(controller, 'stripNullFilters');
        optionSpy = sinon.spy(controller, 'getPaginationOptions');
        filterSpy = sinon.spy(controller, 'addSearchFilter');
      });

      afterEach(function () {
        User.paginate['restore']();
        controller.stripNullFilters.restore();
        controller.getPaginationOptions.restore();
      });

      it('returns empty pagination results when no records match', function () {
        return controller.findPaged({}).then(res => {
          expect(res.total).to.equal(0);
        });
      });

      it('calls Model.paginate() with the expected parameters', function () {
        const params = {
          filters: {
            email: 'alex@test.com'
          },
          select: UserController.projection
        };
        return controller.findPaged(params).then(() => {
          expect(paginationSpy.calledOnce).to.equal(true);

          const options = controller.getPaginationOptions(params);
          expect(paginationSpy.calledWith(params.filters, options)).to.equal(true);
        });
      });

      it('strips null filters', function () {
        return controller.findPaged({}).then(() => {
          expect(nullSpy.calledOnce).to.equal(true);
        });
      });

      it('gets pagination options', function () {
        return controller.findPaged({}).then(() => {
          expect(optionSpy.calledOnce).to.equal(true);
        });
      });

      it('processes search filters', function () {
        const params = {
          filters: {
            search: 'alex@test.com'
          },
          select: UserController.projection
        };
        return controller.findPaged(params).then(() => {
          expect(filterSpy.calledOnce).to.equal(true);
        });
      });
    });
  });
});
