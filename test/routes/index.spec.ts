import chai = require('chai');
import sinon = require('sinon');

const expect = chai.expect;

import { Server } from '../../src/server';

describe('routes/index', function () {
  const url = '/v1';
  let app, server;

  beforeEach(() => {
    server = Server.bootstrap();
    app = server.app;
  });

  it('should exist', function () {
    return chai.request(app).get(url).then(res => {
      expect(res.status).to.equal(200);
    });
  });

  it('should serve html', function () {
    return chai.request(app).get(url).then(res => {
      expect(res.type).to.equal('text/html');
    });
  });

  it('should have a placeholder message', function () {
    return chai.request(app).get(url).then(res => {
      expect(res['text']).to.equal('Welcome to the Gizmo Express API!');
    });
  });

  describe('IndexRouter', function () {
    let router;
    let spy;

    beforeEach(function () {
      router = server.getRouteHandler('index');
      spy = sinon.spy(router, 'index');
    });

    afterEach(function () {
      router.index.restore();
    });

    it('should call the index() method', function () {
      return chai.request(app).get(url).then(function () {
        expect(spy.calledOnce).to.equal(true);
      });
    });
  });
});
