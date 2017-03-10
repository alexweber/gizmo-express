import apicache = require('apicache');

import { isProd } from '../util/environment';

if (!isProd) {
  apicache.options({ debug: true });
}

// Helper to only cache successfull requests.
const onlyStatus200s = req => req.statusCode >= 200 && req.statusCode < 300;

const middleware = apicache.middleware;
// const middleware = process.env.NODE_ENV === 'production' ? apicache
//     .options({redisClient: redis.createClient(config.redis)})
//     .middleware : apicache.middleware;

const cache = period => {
  return middleware(period, onlyStatus200s);
};

export default cache;
