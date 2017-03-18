import chai = require('chai');
import sinon = require('sinon');

const expect = chai.expect;

import { DummyPagedSearchController } from '../fixtures/dummyControllers';

describe('controllers/pagedSearchController', function () {
  let controller;

  beforeEach(() => {
    controller = new DummyPagedSearchController();
  });

  it('should project values', function () {
    expect(DummyPagedSearchController.projection).to.equal('-__v');
  });

  describe('getPaginationOptions()', function () {
    let params;

    beforeEach(() => {
      params = {
        filters: {
          email: 'alex@test.com'
        },
        select: DummyPagedSearchController.projection,
        limit: 10,
        page: 0
      };
    });

    it('returns pagination options', function () {
      const options = controller.getPaginationOptions(params);
      expect(options).to.be.an('object');
    });

    it('sets sorting option', function () {
      params.sort = {
        email: 'asc'
      };
      const options = controller.getPaginationOptions(params);
      expect(options).to.be.an('object');
      expect(options).to.have.property('sort');
      expect(options.sort).to.deep.equal(params.sort);
    });

    it('sets populate option', function () {
      params.populate = {
        foo: 'bar'
      };
      const options = controller.getPaginationOptions(params);
      expect(options).to.be.an('object');
      expect(options).to.have.property('populate');
      expect(options.populate).to.deep.equal([{ path: 'foo', select: 'bar' }]);
    });

    it('sets select option', function () {
      params.select = 'foo';
      const options = controller.getPaginationOptions(params);
      expect(options).to.be.an('object');
      expect(options).to.have.property('select');
      expect(options.select).to.deep.equal(params.select);
    });

    it("doesn't use leanWithId", function () {
      const options = controller.getPaginationOptions(params);
      expect(options).to.be.an('object');
      expect(options).to.have.property('leanWithId');
      expect(options.leanWithId).to.equal(false);
    });

    it('sets lean option', function () {
      const options = controller.getPaginationOptions(params);
      expect(options).to.be.an('object');
      expect(options).to.have.property('lean');
      expect(options.lean).to.equal(true);

      params.lean = false;
      const options2 = controller.getPaginationOptions(params);
      expect(options2).to.be.an('object');
      expect(options2).to.have.property('lean');
      expect(options2.lean).to.equal(false);
    });

    it('sets limit', function () {
      const options = controller.getPaginationOptions(params, true);
      expect(options).to.be.an('object');
      expect(options).to.have.property('limit');
      expect(options.limit).to.equal(params.limit);
    });

    it('sets default offset when page is zero', function () {
      const options = controller.getPaginationOptions(params, true);
      expect(options).to.be.an('object');
      expect(options).to.have.property('offset');
      expect(options.offset).to.equal(0);
    });

    it('sets offset for first page', function () {
      params.page = 1;
      const options = controller.getPaginationOptions(params, true);
      expect(options).to.be.an('object');
      expect(options).to.have.property('offset');
      expect(options.offset).to.equal(params.limit);
    });

    it('sets offset for all pages', function () {
      params.page = 2;
      const options = controller.getPaginationOptions(params, true);
      expect(options).to.be.an('object');
      expect(options).to.have.property('offset');
      expect(options.offset).to.equal(params.limit * params.page);
    });

    it('handles sorting on populated fields', function () {
      params.sort = {};
      params.sort['userId.name'] = 'asc';
      params.populate = { userId: 'name' };
      const populateResult = {
        path: 'userId',
        select: 'name',
        options: {
          sort: {
            name: 'asc'
          }
        }
      };
      const options = controller.getPaginationOptions(params);
      expect(options.sort).to.deep.equal({});
      expect(options.populate).to.deep.equal([populateResult]);
    });

    it('ignores populated sorting on non-populated fields', function () {
      params.sort = {};
      params.sort['userId.name'] = 'asc';
      const options = controller.getPaginationOptions(params);
      expect(options).to.not.have.property('populate');
      expect(options.sort).to.deep.equal(params.sort);
    });
  });
});
