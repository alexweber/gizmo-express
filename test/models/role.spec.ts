import * as chai from 'chai';
import { expect } from 'chai';

import Role from '../../src/models/user.model';

describe('models/Role', () => {

  it('should exist', function () {
    expect(Role).to.exist;
  });

  it('should be a function', function () {
    expect(Role).to.be.a('function');
  });

  // @TODO actually test middleware stuff.

});
