import { Router } from 'express';

import config = require('config');

export abstract class BaseRouter {
  // The route prefix, contains at the very least the API version.
  public prefix: string;

  constructor (public router: Router, prefix?: string) {
    const version = config.get('api.version');
    this.prefix = `/v${version || 1}`;

    if (prefix) {
      this.prefix += `/${prefix}`;
    }
  }

  // Must be implemented to initialize routes.
  public abstract init ();

  public errorHandler (err) {
    // @TODO generic way to handle errrors.
    console.error(err);
  }
}
