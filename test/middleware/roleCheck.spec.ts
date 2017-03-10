import * as chai from 'chai';
import { expect } from 'chai';

import roleCheck from '../../src/middleware/roleCheck';

describe('middleware/roleCheck', () => {

  it('should exist', function () {
    expect(roleCheck).to.exist;
  });

  it('should be a function', function () {
    expect(roleCheck).to.be.a('function');
  });

  // @TODO actually test middleware stuff.

});
