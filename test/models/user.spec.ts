import chai = require('chai');

const expect = chai.expect;

import User from '../../src/models/user';

describe('models/User', function () {

  it('should exist', function () {
    expect(User).to.exist;
  });

  it('should be a function', function () {
    expect(User).to.be.a('function');
  });

  it('should be invalid if name is empty', function (done) {
    const u = new User();

    u.validate(function (err) {
      expect(err.errors.name).to.exist;
      done();
    });
  });

  it('should be invalid if id is empty', function (done) {
    const u = new User();

    u.validate(function (err) {
      expect(err.errors.id).to.exist;
      done();
    });
  });

});
