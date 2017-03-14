import chai = require('chai');
import config = require('config');
import express = require('express');
const Router = express.Router();

const expect = chai.expect;
import { DummyRouter } from '../fixtures/dummyRouter';

describe('BaseRouter', () => {

  it('base router api version falls back to v1', function () {
    let router = new DummyRouter(Router);
    expect(router).to.exist;
    expect(router).to.be.an('object');
    expect(router.prefix).to.equal('/v1');
  });

  it('base router sets api version according to config', function () {
    // Override config values. This is possible due to the ALLOW_CONFIG_MUTATIONS flag.
    const oldVersion = config.get('api.version');
    config['api']['version'] = 5;
    let router = new DummyRouter(Router);
    expect(router.prefix).to.equal('/v5');
    config['api']['version'] = oldVersion;
  });

  it('base router sets up path prefixes', function () {
    let router = new DummyRouter(Router, 'foo');
    expect(router.prefix).to.equal('/v1/foo');
  });
});
