import chai = require('chai');

const expect = chai.expect;

import Role from '../../src/models/role.model';

describe('models/Role', function () {

  it('should exist', function () {
    expect(Role).to.exist;
  });

  it('should be a function', function () {
    expect(Role).to.be.a('function');
  });

  it('should be invalid if name is empty', function (done) {
    const r = new Role();

    r.validate(function (err) {
      expect(err.errors.name).to.exist;
      done();
    });
  });

  it('should be invalid if slug is empty', function (done) {
    const r = new Role();

    r.validate(function (err) {
      expect(err.errors.slug).to.exist;
      done();
    });
  });

  // @TODO
  // it('should treat names as unique', function (done) {
  //
  // });
});
