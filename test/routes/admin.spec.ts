import chai = require('chai');
import sinon = require('sinon');

import express = require('express');
const Router = express.Router();

const expect = chai.expect;

import app from '../bootstrap';
import { AdminRouter } from '../../src/routes/admin';

let route;

describe('routes/admin', () => {
  const url = '/';

  it('should exist', function () {
    return chai.request(app).get(url).then(res => {
      expect(res.status).to.equal(200);
    });
  });

  it('should serve html', () => {
    return chai.request(app).get(url).then(res => {
      expect(res.type).to.equal('text/html');
    });
  });

  it('should have a placeholder message', () => {
    return chai.request(app).get(url).then(res => {
      expect(res['text']).to.equal('Hello from admin.html\n');
    });
  });

  describe('adminRouter', () => {
    let stub;

    beforeEach(() => {
      route = new AdminRouter(Router);
      stub = sinon.stub(route, 'index');
    });

    afterEach(function () {
      route.index.restore();
    });

    it('should call the index() method', () => {
      return chai.request(app).get(url).then(() => {
        sinon.assert.called(stub);
      });
    });
  });
});
