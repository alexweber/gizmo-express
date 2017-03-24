import * as chai from 'chai';

const expect = chai.expect;

import { isEnv, isDev, isStage, isProd, isTest } from '../../src/util/environment';

const replaceEnvironment = (name: string) => {
  process.env.NODE_ENV = name;
};

const restoreEnvironment = () => {
  process.env.NODE_ENV = 'test';
};

describe('util/environment', function () {

  beforeEach(() => {
    restoreEnvironment();
  });

  describe('isEnv', function () {
    it('should exist', function () {
      expect(isEnv).to.exist;
    });

    it('should be a function', function () {
      expect(isEnv).to.be.a('function');
    });

    it('should return a boolean', function () {
      expect(isEnv('foo')).to.be.a('boolean');
    });

    it('should return whether the current environment matches the specified one', function () {
      expect(isEnv('foo')).to.equal(false);
      expect(isEnv('test')).to.equal(true);
    });
  });

  describe('isDev', function () {
    it('should exist', function () {
      expect(isDev).to.exist;
    });

    it('should be a function', function () {
      expect(isDev).to.be.a('function');
    });

    it('should return a boolean', function () {
      expect(isDev()).to.be.a('boolean');
    });

    it('should return whether the current environment is "development"', function () {
      expect(isDev()).to.equal(false);
      replaceEnvironment('development');
      expect(isDev()).to.equal(true);
    });
  });

  describe('isStage', function () {
    it('should exist', function () {
      expect(isStage).to.exist;
    });

    it('should be a function', function () {
      expect(isStage).to.be.a('function');
    });

    it('should return a boolean', function () {
      expect(isStage()).to.be.a('boolean');
    });

    it('should return whether the current environment is "staging"', function () {
      expect(isStage()).to.equal(false);
      replaceEnvironment('staging');
      expect(isStage()).to.equal(true);
    });
  });

  describe('isProd', function () {
    it('should exist', function () {
      expect(isProd).to.exist;
    });

    it('should be a function', function () {
      expect(isProd).to.be.a('function');
    });

    it('should return a boolean', function () {
      expect(isProd()).to.be.a('boolean');
    });

    it('should return whether the current environment is "production"', function () {
      expect(isProd()).to.equal(false);
      replaceEnvironment('production');
      expect(isProd()).to.equal(true);
    });
  });

  describe('isTest', function () {
    it('should exist', function () {
      expect(isTest).to.exist;
    });

    it('should be a function', function () {
      expect(isTest).to.be.a('function');
    });

    it('should return a boolean', function () {
      expect(isTest()).to.be.a('boolean');
    });

    it('should return whether the current environment is "test"', function () {
      expect(isTest()).to.equal(true);
      replaceEnvironment('development');
      expect(isTest()).to.equal(false);
    });
  });
});
