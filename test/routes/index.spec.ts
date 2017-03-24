import * as chai from 'chai';
import * as sinon from 'sinon';

import { Server } from '../../src/server';

const expect = chai.expect;
const sandbox = sinon.sandbox.create();

describe('routes/index', function () {
  const url = '/v1';
  let app, server;

  beforeEach(() => {
    server = Server.bootstrap();
    app = server.app;
  });

  afterEach(() => {
    sandbox.restore();
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
      spy = sandbox.spy(router, 'index');
    });

    it('should call the index() method', function () {
      return chai.request(app).get(url).then(function () {
        expect(spy.calledOnce).to.equal(true);
      });
    });
  });
});
