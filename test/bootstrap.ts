// Bootstrap tests.

import chai = require('chai');
import sinon = require('sinon');

// Chai plugins.
import chaiHttp = require('chai-http');
chai.use(chaiHttp);

import sinonChai = require('sinon-chai');
chai.use(sinonChai);

// Sinon plugins.
const sinonStubPromise = require('sinon-stub-promise');
sinonStubPromise(sinon);

// Mongooose minimal setup.
import mongoose = require('mongoose');
mongoose.Promise = Promise;

// Convenience.
import { Server } from '../src/server';

export function getServer () {
  return Server.bootstrap();
}

// Helpers.
/**
 * Removes a module from the cache
 */
export function purgeCache (moduleName) {
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
export function searchCache (moduleName, callback) {
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

