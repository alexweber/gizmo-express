import chai = require('chai');

const expect = chai.expect;

import stripAccents from '../../src/util/stripAccents';

describe('util/stripAccents', function () {

  it('should exist', function () {
    expect(stripAccents).to.exist;
  });

  it('should be a function', function () {
    expect(stripAccents).to.be.a('function');
  });

  it('should strip accents', function () {
    expect(stripAccents('íêàçõûñü')).to.equal('ieacounu');
    expect(stripAccents('ÍÊÀÇÕÛÑÜ')).to.equal('IEACOUNU');
  });

});
