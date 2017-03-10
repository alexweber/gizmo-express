import { NextFunction, Request, Response, Router } from 'express';

import { BaseRouter } from './route';
import { debug } from '../util/debug';

/**
 * Index router.
 */
export class IndexRouter extends BaseRouter {

  constructor (router: Router) {
    super(router);
  }

  /**
   * Create the index routes.
   */
  public init () {
    debug('[IndexRouter::create] Creating index routes.');

    // Default route.
    this.router.get(this.prefix, (req: Request, res: Response, next: NextFunction) => {
      this.index(req, res, next);
    });
  }

  /**
   * The atual index route.
   *
   * @param req {Request} The express Request object.
   * @param res {Response} The express Response object.
   * @next {NextFunction} Execute the next method.
   */
  public index (req: Request, res: Response, next: NextFunction) {
    res.send('index route');
  }
}
