import chai = require('chai');
import sinon = require('sinon');
import mongoose = require('mongoose');
import config = require('config');

const expect = chai.expect;

import { Server } from '../src/server';
import { moduleLoaded, purgeCache } from './bootstrap';

// Hacky-ass helper.
const reloadCache = () => {
  purgeCache('../src/server');
  require('../src/server');
};

const sandbox = sinon.sandbox.create();

describe('main server script', function () {
  let server, app, configSpy, dbSpy, permSpy, routeSpy, clientSpy;

  beforeEach(() => {
    configSpy = sandbox.spy(Server.prototype, 'config');
    dbSpy = sandbox.spy(Server.prototype, 'database');
    permSpy = sandbox.spy(Server.prototype, 'permissions');
    routeSpy = sandbox.spy(Server.prototype, 'routes');
    clientSpy = sandbox.spy(Server.prototype, 'client');
    server = Server.bootstrap();
    app = server.app;
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('configures itself', function () {
    expect(configSpy.called).to.equal(true);
  });

  it('initializes the database', function () {

  });

  it('initializes permissions', function () {

  });

  it('initializes routes', function () {

  });

  it('initializes client app', function () {

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
      server = Server.bootstrap();
      app = server.app;
      expect(mongoose.get('debug')).to.eq(false);
    });
  });

  describe('mongo connection', function () {
    let connectSpy, server, app;

    beforeEach(() => {
      reloadCache();
      connectSpy = sinon.spy(mongoose, 'connect');
      server = Server.bootstrap();
      app = server.app;
    });

    afterEach(() => {
      mongoose.connect['restore']();
    });

    // it('connects to mongodb', function () {
    //   expect(connectSpy.calledOnce).to.equal(true);
    // });
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
