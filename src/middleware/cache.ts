import { Request, Response } from 'express';
import * as apicache from 'apicache';
import * as config from 'config';
import * as redis from 'redis';

// @TODO add type when @types/apicache is available.
const options: any = {
  debug: config.get('cache.debug'),
  // 3 hour default duration.
  defaultDuration: 3600000 * 3
};

const redisHost = config.get('cache.redis');
if (redisHost !== false) {
  options.redisClient = redis.createClient(redisHost);
}

apicache.options(options);

// Helper to only cache successfull requests.
const onlyStatus200s = (req: Request|any, res?: Response|any) => {
  return res.statusCode >= 200 && res.statusCode < 300;
};

const cache = (period?: string) => {
  return apicache.middleware(period, onlyStatus200s);
};

export default cache;

// For testing.
export { onlyStatus200s };
