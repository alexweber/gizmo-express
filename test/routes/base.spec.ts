import chai = require('chai');
import config = require('config');
import express = require('express');
const Router = express.Router();

const expect = chai.expect;
import { DummyRouter } from '../fixtures/dummyRouters';

describe('BaseRouter', function () {

  let oldVersion;

  before(() => {
    oldVersion = config.get('api.version');
  });

  afterEach(() => {
    config['api']['version'] = oldVersion;
  });

  it('base router sets prefix with api version', function () {
    let router = new DummyRouter(Router);
    expect(router).to.exist;
    expect(router).to.be.an('object');
    expect(router.prefix).to.equal('/v1');
  });

  it('base router sets up optional path prefixes', function () {
    let router = new DummyRouter(Router, 'foo');
    expect(router.prefix).to.equal('/v1/foo');
    let router2 = new DummyRouter(Router, 'bar');
    expect(router2.prefix).to.equal('/v1/bar');
    let router3 = new DummyRouter(Router);
    expect(router3.prefix).to.equal('/v1');
  });

  it('base router sets api version according to config', function () {
    // Override config values. This is possible due to the ALLOW_CONFIG_MUTATIONS flag.
    config['api']['version'] = 5;
    let router = new DummyRouter(Router);
    expect(router.prefix).to.equal('/v5');
  });

  it('falls back to "1" if no version specified', function () {
    config['api']['version'] = null;
    let router = new DummyRouter(Router);
    expect(router.prefix).to.equal('/v1');
  });
});
