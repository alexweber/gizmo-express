import * as chai from 'chai';
import * as sinon from 'sinon';
import * as mongoose from 'mongoose';
import * as config from 'config';

const expect = chai.expect;

import { Server } from '../src/server';
import { moduleLoaded, purgeCache } from './bootstrap';

// Hacky-ass helper.
const reloadCache = () => {
  purgeCache('../src/server');
  require('../src/server');
};

const sandbox = sinon.sandbox.create();

describe('server', () => {

  afterEach(() => {
    sandbox.restore();
  });

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
      expect(dbSpy.called).to.equal(true);
    });

    it('initializes permissions', function () {
      expect(permSpy.called).to.equal(true);
    });

    it('initializes routes', function () {
      expect(routeSpy.called).to.equal(true);
    });

    it('initializes client app', function () {
      expect(clientSpy.called).to.equal(true);
    });
  });

  it('mongoose debug mode is disabled by default', function () {
    expect(mongoose.get('debug')).to.not.eq(true);
  });

  describe('debug mode', function () {
    let server;

    afterEach(() => {
      config['db']['debug'] = false;
      reloadCache();
    });

    it('enables mongoose debug mode if specified in config', function () {
      config['db']['debug'] = true;
      reloadCache();
      purgeCache('mongoose');
      require('mongoose');
      server = Server.bootstrap();
      expect(mongoose.get('debug')).to.eq(true);
    });

    it('disables mongoose debug mode if specified in config', function () {
      config['db']['debug'] = false;
      reloadCache();
      purgeCache('mongoose');
      require('mongoose');
      server = Server.bootstrap();
      expect(mongoose.get('debug')).to.eq(false);
    });
  });

  describe('mongo connection', function () {
    let connectSpy, server, app;

    beforeEach(() => {
      reloadCache();
      purgeCache('mongoose');
      require('mongoose');
      connectSpy = sandbox.spy(mongoose, 'connect');
      server = Server.bootstrap();
      app = server.app;
    });

    it('connects to mongodb', function () {
      expect(connectSpy.called).to.equal(true);
    });
  });

  describe('known model discovery', function () {
    it('includes the role model', function () {
      const loaded = moduleLoaded('../src/models/role.model');
      expect(loaded).to.eq(true);
    });

    it('includes the user model', function () {
      const loaded = moduleLoaded('../src/models/user.model');
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
    let app, server;

    beforeEach(() => {
      server = Server.bootstrap();
      app = server.app;
    });

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
