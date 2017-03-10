import * as chai from 'chai';
import { expect } from 'chai';

import cache from '../../src/middleware/cache';

describe('middleware/cache', () => {

  it('should exist', function () {
    expect(cache).to.exist;
  });

  it('should be a function', function () {
    expect(cache).to.be.a('function');
  });

  // @TODO actually test middleware stuff.

});
