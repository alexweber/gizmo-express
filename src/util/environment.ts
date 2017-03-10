import config = require('config');

const environment = config.util.getEnv('NODE_ENV');

const isEnv = (name: string): boolean => {
  return environment === name;
};

// Convenience helpers.

const isProd = () => {
  return isEnv('production');
};
const isStaging = () => {
  return isEnv('staging');
};
const isDev = () => {
  return isEnv('development');
};
const isTest = () => {
  return isEnv('test');
};

export {
  isEnv,
  isProd,
  isStaging,
  isDev,
  isTest
};
