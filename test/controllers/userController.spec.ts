import * as chai from 'chai';
import { expect } from 'chai';

import UserController from '../../src/controllers/userController';

describe('controllers/userController', () => {

  it('should exist', function () {
    expect(UserController).to.exist;
  });

  it('should be a function', function () {
    expect(UserController).to.be.a('function');
  });

});
