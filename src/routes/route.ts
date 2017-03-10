import { NextFunction, Request, Response, Router } from 'express';

import config = require('config');

/**
 * Constructor
 *
 * @class BaseRoute
 */
export abstract class BaseRouter {
  public prefix: string;

  constructor (public router: Router, prefix?: string) {
    const version = config.get('api.version');
    this.prefix = `/v${version || 1}`;

    if (prefix) {
      this.prefix += `/${prefix}`;
    }
  }

  public abstract init();
}
