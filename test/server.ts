import chai = require('chai');
import sinon = require('sinon');
import mongoose = require('mongoose');
import config = require('config');

const expect = chai.expect;

import { getServer } from './bootstrap';

describe('main server script', function () {
  let server, app;

  beforeEach(() => {
    server = getServer();
    app = server.app;
  });

  it('mongoose debug mode is disabled by default', function () {
    expect(mongoose.get('debug')).to.not.equal(true);
  });

  describe('debug mode', function () {
    before(() => {
      config['db']['debug'] = true;
    });

    after(() => {
      config['db']['debug'] = false;
    });

    it('enables mongoose debug mode if specified in config', function () {
      expect(mongoose.get('debug')).to.equal(true);
    });
  });
});
