import chai = require('chai');
import sinon = require('sinon');
import apicache = require('apicache');
import config = require('config');

const expect = chai.expect;

import cache from '../../src/middleware/cache';
import { onlyStatus200s } from '../../src/middleware/cache';
import { purgeCache } from '../bootstrap';

const reloadCache = () => {
  purgeCache('../src/middleware/cache');
  require('../../src/middleware/cache');
};

describe('middleware/cache', function () {

  it('should exist', function () {
    expect(cache).to.exist;
  });

  it('should be a function', function () {
    expect(cache).to.be.a('function');
  });

  it('enables debug mode by default', function () {
    const options = apicache.options();
    expect(options.debug).to.equal(true);
  });

  it('disables debug if specified in config', function () {
    config['cache']['debug'] = false;
    reloadCache();
    const options = apicache.options();
    expect(options.debug).to.equal(false);
    config['cache']['debug'] = true;
    reloadCache();
  });

  it('disables redis by default', function () {
    const options = apicache.options();
    expect(options.redisClient).to.equal(false);
  });

  it('enables redis if specified in config', function () {
    config['cache']['redis'] = 'localhost';
    reloadCache();
    const options = apicache.options();
    expect(options.redisClient).to.not.equal(false);
    expect(options.redisClient).to.be.an('object');
    config['cache']['redis'] = false;
    reloadCache();
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

  it('calls apicache middleware with the correct parameters', function () {
    const spy = sinon.spy(apicache, 'middleware');
    const args = '1 month';
    reloadCache();
    cache(args);
    expect(spy.called).to.equal(true);
    expect(spy.calledWith(args, onlyStatus200s)).to.equal(true);
    spy.restore();
    reloadCache();
  });
});
