const isEnv = (name: string): boolean => {
  return process.env.NODE_ENV === name;
};

// Convenience helpers.

const isProd = () => {
  return isEnv('production');
};
const isStage = () => {
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
  isStage,
  isDev,
  isTest
};
