import * as chai from 'chai';
import { expect } from 'chai';

import app from '../bootstrap';

describe('IndexRouter:index', () => {

  it('should exist', function () {
    return chai.request(app).get('/').then(res => {
      expect(res.status).to.eql(200);
    });
  });

  it('should serve html', () => {
    return chai.request(app).get('/').then(res => {
      expect(res.type).to.eql('text/html');
    });
  });

  it('should have a placeholder message', () => {
    return chai.request(app).get('/').then(res => {
      expect(res['text']).to.eql('Hello from index.html\n');
    });
  });

});
