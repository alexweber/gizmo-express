import * as chai from 'chai';

const expect = chai.expect;

import authCheck from '../../src/middleware/authCheck';

describe('middleware/authCheck', function () {

  it('should exist', function () {
    expect(authCheck).to.exist;
  });

  it('should be a function', function () {
    expect(authCheck).to.be.a('function');
  });

  // @TODO actually test middleware stuff.

});
