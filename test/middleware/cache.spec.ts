import chai = require('chai');
import sinon = require('sinon');
import apicache = require('apicache');
import config = require('config');

const expect = chai.expect;

import cache from '../../src/middleware/cache';
import { onlyStatus200s } from '../../src/middleware/cache';

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
    purgeCache('../../src/middleware/cache');
    require('../../src/middleware/cache');
    const options = apicache.options();
    expect(options.debug).to.equal(false);
    config['cache']['debug'] = true;
  });

  it('disables redis by default', function () {
    const options = apicache.options();
    expect(options.redisClient).to.equal(false);
  });

  it('enables redis if specified in config', function () {
    config['cache']['redis'] = 'localhost';
    purgeCache('../../src/middleware/cache');
    require('../../src/middleware/cache');
    const options = apicache.options();
    expect(options.redisClient).to.not.equal(false);
    expect(options.redisClient).to.be.an('object');
    config['cache']['redis'] = false;
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
    purgeCache('../../src/middleware/cache');
    require('../../src/middleware/cache');

    cache(args);
    expect(spy.called).to.equal(true);
    expect(spy.calledWith(args, onlyStatus200s)).to.equal(true);
    spy.restore();
  });
});

/**
 * Removes a module from the cache
 */
function purgeCache (moduleName) {
  // Traverse the cache looking for the files
  // loaded by the specified module name
  searchCache(moduleName, function (mod) {
    delete require.cache[mod.id];
  });

  // Remove cached paths to the module.
  // Thanks to @bentael for pointing this out.
  Object.keys(module.constructor['_pathCache']).forEach(function (cacheKey) {
    if (cacheKey.indexOf(moduleName) > 0) {
      delete module.constructor['_pathCache'][cacheKey];
    }
  });
}

/**
 * Traverses the cache to search for all the cached
 * files of the specified module name
 */
function searchCache (moduleName, callback) {
  // Resolve the module identified by the specified name
  let mod = require.resolve(moduleName);

  // Check if the module has been resolved and found within
  // the cache
  if (mod && ((mod = require.cache[mod]) !== undefined)) {
    // Recursively go over the results
    (function traverse (mod) {
      // Go over each of the module's children and
      // traverse them
      mod['children'].forEach(function (child) {
        traverse(child);
      });

      // Call the specified callback providing the
      // found cached module
      callback(mod);
    }(mod));
  }
}
