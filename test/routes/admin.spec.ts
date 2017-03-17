import chai = require('chai');
import sinon = require('sinon');

const expect = chai.expect;

import { getServer } from '../bootstrap';
const server = getServer();
const app = server.app;

describe('routes/admin', () => {
  const url = '/v1/admin';

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
      expect(res['text']).to.equal('Welcome to the Gizmo Express Admin API!');
    });
  });

  // @TODO test crud routes generated.
});
