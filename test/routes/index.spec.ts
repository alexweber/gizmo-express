import chai = require('chai');
import sinon = require('sinon');

const expect = chai.expect;

import { getServer } from '../bootstrap';
const server = getServer();
const app = server.app;

describe('routes/index', () => {
  const url = '/v1';

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
      expect(res['text']).to.equal('Welcome to the Gizmo Express API!');
    });
  });

  describe('indexRouter', () => {
    let router;
    let spy;

    beforeEach(() => {
      router = server.getRouteHandler('index');
      spy = sinon.spy(router, 'index');
    });

    afterEach(function () {
      router.index.restore();
    });

    it('should call the index() method', () => {
      return chai.request(app).get(url).then(() => {
        expect(spy.calledOnce).to.equal(true);
      });
    });
  });
});
