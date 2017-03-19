import chai = require('chai');
import sinon = require('sinon');
import mongoose = require('mongoose');
import config = require('config');

const expect = chai.expect;

import { getServer, moduleLoaded, purgeCache } from './bootstrap';

// Hacky-ass helper.
const reloadCache = () => {
  purgeCache('../src/server');
  require('../src/server');
};

describe('main server script', function () {
  let server, app;

  beforeEach(() => {
    server = getServer();
    app = server.app;
  });

  it('mongoose debug mode is disabled by default', function () {
    expect(mongoose.get('debug')).to.not.eq(true);
  });

  describe('debug mode', function () {
    before(() => {
      config['db']['debug'] = true;
    });

    after(() => {
      config['db']['debug'] = false;
    });

    it('enables mongoose debug mode if specified in config', function () {
      expect(mongoose.get('debug')).to.eq(true);
    });

    it('disables mongoose debug mode if specified in config', function () {
      config['db']['debug'] = false;
      reloadCache();
      server = getServer();
      app = server.app;
      expect(mongoose.get('debug')).to.eq(false);
    });
  });

  describe('known model discovery', function () {
    it('includes the role model', function () {
      const loaded = moduleLoaded('../src/models/role');
      expect(loaded).to.eq(true);
    });

    it('includes the user model', function () {
      const loaded = moduleLoaded('../src/models/user');
      expect(loaded).to.eq(true);
    });

    it("doesn't include fake model", function () {
      const loaded = moduleLoaded('../src/models/fake');
      expect(loaded).to.eq(false);
    });
  });

  describe('automatic model discovery', function () {
    // @TODO figure out how to test this.
  });

  describe('getRouteHandler()', function () {
    it('exists', function () {
      expect(server).to.respondTo('getRouteHandler');
    });

    it('returns false when none found', function () {
      expect(server.getRouteHandler('foo')).to.eq(false);
      expect(server.getRouteHandler()).to.eq(false);
    });

    it('returns route handlers when they exist', function () {
      expect(server.getRouteHandler('index')).to.not.eq(false);
      expect(server.getRouteHandler('index')).to.be.an('object');
    });
  });
});
