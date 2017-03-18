import chai = require('chai');
import sinon = require('sinon');

const expect = chai.expect;

import { DummySearchController } from '../fixtures/dummyControllers';

describe('controllers/searchController', function () {
  let controller;

  beforeEach(() => {
    controller = new DummySearchController();
  });

  it('should project values', function () {
    expect(DummySearchController.projection).to.equal('-__v');
  });

  describe('stripNullFilters()', function () {
    it('strips null filters', function () {
      const params = {
        filters: {
          foo: null
        }
      };

      const stripped = controller.stripNullFilters(params);
      expect(stripped).to.have.property('filters');
      expect(stripped.filters).to.be.empty;
    });

    it('preservers valid filters', function () {
      const params = {
        filters: {
          foo: 'foo'
        }
      };

      const stripped = controller.stripNullFilters(params);
      expect(stripped).to.deep.equal(params);
    });
  });

  describe('addSearchFilter()', function () {
    let searchParams, dummyComplexResult, dummySimpleResult;
    const fields = ['foo', 'bar'];
    const field = ['foo'];

    beforeEach(() => {
      searchParams = {
        filters: {
          search: 'searchString'
        }
      };
      dummyComplexResult = [
        {
          foo: {
            $regex: searchParams.filters.search,
            $options: 'i'
          }
        },
        {
          bar: {
            $regex: searchParams.filters.search,
            $options: 'i'
          }
        }
      ];
      dummySimpleResult = {};
      dummySimpleResult[field[0]] = searchParams.filters.search;
    });

    it('adds complex search filters', function () {
      const result = controller.addSearchFilter(searchParams, fields);
      expect(result.filters).to.have.property('$or');
      expect(result.filters.$or).to.be.an('array');
      expect(result.filters.$or).to.deep.equal(dummyComplexResult);
    });

    it('adds simple search filters', function () {
      const result = controller.addSearchFilter(searchParams, field);
      expect(result.filters).to.deep.equal(dummySimpleResult);
    });

    it('cleans up the search filter param', function () {
      const result = controller.addSearchFilter(searchParams, fields);
      expect(result.filters).to.not.have.property('search');
    });

    // it('strips accents', function () {
    // @TODO
    // });
  });

  describe('getSearchParams()', function () {
    let request;
    const sortParamAsc = {
      name: 'asc'
    };
    const sortParamDesc = {
      name: 'desc'
    };

    beforeEach(() => {
      request = {
        body: { name: 'test' },
        query: {
          page: 0,
          limit: 10,
          sort: 'name',
          dir: 'asc'
        }
      };
    });

    it('converts a request into an ISearchParam object', function () {
      const params = controller.getSearchParams(request);
      expect(params).to.be.an('object');
      expect(params).to.have.property('page');
      expect(params.page).to.equal(request.query.page);
      expect(params).to.have.property('limit');
      expect(params.limit).to.equal(request.query.limit);
      expect(params).to.have.property('sort');
      expect(params.sort).to.deep.equal(sortParamAsc);
      expect(params).to.have.property('filters');
      expect(params.filters).to.deep.equal(request.body);
    });

    it('falls back to descending order', function () {
      delete request.query.dir;
      const params = controller.getSearchParams(request);
      expect(params).to.be.an('object');
      expect(params).to.have.property('sort');
      expect(params.sort).to.deep.equal(sortParamDesc);
    });

    it('works fine with no sorts', function () {
      delete request.query.dir;
      delete request.query.sort;
      const params = controller.getSearchParams(request);
      expect(params).to.be.an('object');
      expect(params).to.have.property('sort');
      expect(params.sort).to.be.empty;
    });

    it('works fine with no body', function () {
      delete request.body;
      const params = controller.getSearchParams(request);
      expect(params).to.be.an('object');
      expect(params).to.have.property('filters');
      expect(params.filters).to.be.empty;
    });

    it('defaults to page 0', function () {
      delete request.page;
      const params = controller.getSearchParams(request);
      expect(params).to.be.an('object');
      expect(params).to.have.property('page');
      expect(params.page).to.equal(0);
    });

    it('defaults to limit 10', function () {
      delete request.limit;
      const params = controller.getSearchParams(request);
      expect(params).to.be.an('object');
      expect(params).to.have.property('limit');
      expect(params.limit).to.equal(10);
    });
  });
});
