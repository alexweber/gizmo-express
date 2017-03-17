import chai = require('chai');
import sinon = require('sinon');

const expect = chai.expect;

import { DummySearchController } from '../fixtures/dummyControllers';

describe('controllers/searchController', function () {
  let controller;

  beforeEach(() => {
    controller = new DummySearchController();
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
    let searchParams, dummyResult
    const fields = ['foo', 'bar'];

    beforeEach(() => {
      searchParams = {
        filters: {
          search: 'searchString'
        }
      };
      dummyResult = [
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
    });

    it('adds search filters', function () {
      const result = controller.addSearchFilter(searchParams, fields);
      expect(result.filters).to.have.property('$or');
      expect(result.filters.$or).to.be.an('array');
      expect(result.filters.$or).to.deep.equal(dummyResult);
    });

    it('cleans up the search filter param', function () {
      const result = controller.addSearchFilter(searchParams, fields);
      expect(result.filters).to.not.have.property('search');
    });

    // it('strips accents', function () {
    // @TODO
    // });
  });
});
