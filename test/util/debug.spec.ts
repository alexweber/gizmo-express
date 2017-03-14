import chai = require('chai');

const expect = chai.expect;

import { debug } from '../../src/util/debug';

describe('util/debug', function () {

  it('should exist', function () {
    expect(debug).to.exist;
  });

  it('should be a function', function () {
    expect(debug).to.be.a('function');
  });

  // @TODO
  // it('should print to console in development environment', function () {
  //
  // });
  //
  // it('should do nothing in other environments', function () {
  //
  // });

});
