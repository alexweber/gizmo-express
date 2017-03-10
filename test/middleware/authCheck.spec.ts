import * as chai from 'chai';
import { expect } from 'chai';

import authCheck from '../../src/middleware/authCheck';

describe('middleware/authCheck', () => {

  it('should exist', function () {
    expect(authCheck).to.exist;
  });

  it('should be a function', function () {
    expect(authCheck).to.be.a('function');
  });

  // @TODO actually test middleware stuff.

});
