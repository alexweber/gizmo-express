import * as chai from 'chai';

const expect = chai.expect;

import sanitize from '../../src/util/sanitize';

describe('util/sanitize', function () {

  it('should exist', function () {
    expect(sanitize).to.exist;
  });

  it('should be a function', function () {
    expect(sanitize).to.be.a('function');
  });


  it('should sanitize simple values without type-casting them', function () {
    expect(sanitize('test')).to.eq('test');
  });

  it('should skip numbers, booleans, null and undefined', function () {
    expect(sanitize(123)).to.eq(123);
    expect(sanitize(undefined)).to.eq(undefined);
    expect(sanitize(true)).to.eq(true);
    expect(sanitize(null)).to.eq(null);
  });

  it('should not strip accents', function () {
    expect(sanitize('íêàçõûñü')).to.eq('íêàçõûñü');
    expect(sanitize('ÍÊÀÇÕÛÑÜ')).to.eq('ÍÊÀÇÕÛÑÜ');
  });

  it('should mangle functions', function () {
    expect(sanitize(function () {})).to.eq(null);
  });

  it('should sanitize arrays', function () {
    const source = [
      123,
      'test'
    ];
    const result = [
      123,
      'test'
    ];
    expect(sanitize(source)).to.deep.equal(result);
  });

  it('should sanitize arrays recursively', function () {
    const source = [
      [
        123,
        'foo',
        ['bar']
      ]
    ];
    const result = [
      [
        123,
        'foo',
        ['bar']
      ]
    ];
    expect(sanitize(source)).to.deep.equal(result);
  });

  it('should sanitize objects', function () {
    const source = {
      foo: 123,
      bar: 'baz'
    };
    const result = {
      foo: 123,
      bar: 'baz'
    };
    expect(sanitize(source)).to.deep.equal(result);
  });

  it('should sanitize objects recursively', function () {
    const source = {
      foo: 123,
      bar: 'baz',
      what: { nested: true }
    };
    const result = {
      foo: 123,
      bar: 'baz',
      what: { nested: true }
    };
    expect(sanitize(source)).to.deep.equal(result);
  });

  it('should sanitize any nested data structure', function () {
    const source = {
      foo: 123,
      bar: 'baz',
      test: [0, 1, 2],
      what: {
        nested: true,
        list: [
          {
            nestedMore: true,
            level: 4
          }
        ]
      }
    };
    const result = {
      foo: 123,
      bar: 'baz',
      test: [0, 1, 2],
      what: {
        nested: true,
        list: [
          {
            nestedMore: true,
            level: 4
          }
        ]
      }
    };
    expect(sanitize(source)).to.deep.equal(result);
  });

  it('should actually sanitize strings', function () {
    expect(sanitize('<img src=x onerror=alert(1)//>')).to.deep.equal('&lt;img src=x onerror=alert(1)&#x2F;&#x2F;&gt;');
  });

  it('should preserve HTML if specified', function () {
    expect(sanitize('<img src=x onerror=alert(1)//>', true)).to.deep.equal('<img src="x">');
  });
});
