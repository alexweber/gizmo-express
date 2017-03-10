import * as chai from 'chai';
import { expect } from 'chai';

import User from '../../src/models/user.model';

describe('models/User', () => {

  it('should exist', function () {
    expect(User).to.exist;
  });

  it('should be a function', function () {
    expect(User).to.be.a('function');
  });

  // @TODO actually test middleware stuff.

});
