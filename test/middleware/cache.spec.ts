import chai = require('chai');
import sinon = require('sinon');
import apicache = require('apicache');

const expect = chai.expect;

import cache from '../../src/middleware/cache';
import { onlyStatus200s } from '../../src/middleware/cache';
import { purgeCache } from '../bootstrap';

describe('middleware/cache', function () {

  it('should exist', function () {
    expect(cache).to.exist;
  });

  it('should be a function', function () {
    expect(cache).to.be.a('function');
  });

  it('enables debug mode when not in production', function () {
    const options = apicache.options();
    expect(options.debug).to.equal(true);
  });

  it('disables debug mode when in production', function () {
    process.env.NODE_ENV = 'production';
    purgeCache('../src/middleware/cache');
    require('../../src/middleware/cache');
    const options = apicache.options();
    expect(options.debug).to.equal(false);
    process.env.NODE_ENV = 'test';
  });

  it('only caches successfull requests', function () {
    expect(onlyStatus200s({ statusCode: 199 })).to.deep.equal(false);
    expect(onlyStatus200s({ statusCode: 200 })).to.deep.equal(true);
    expect(onlyStatus200s({ statusCode: 201 })).to.deep.equal(true);
    expect(onlyStatus200s({ statusCode: 250 })).to.deep.equal(true);
    expect(onlyStatus200s({ statusCode: 299 })).to.deep.equal(true);
    expect(onlyStatus200s({ statusCode: 300 })).to.deep.equal(false);
    expect(onlyStatus200s({ statusCode: 400 })).to.deep.equal(false);
  });

  // it('calls apicache middleware with the correct parameters', function () {
  //   const testObj = { middleware: apicache.middleware };
  //   const spy = sinon.spy(testObj, 'middleware');
  //   const args = '1 month';
  //   cache(args);
  //   console.log(spy);
  //   expect(spy.called).to.equal(true);
  //   // expect(spy.calledWith(args)).to.equal(true);
  //   spy.restore();
  // });
});
