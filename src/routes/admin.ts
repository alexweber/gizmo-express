import { NextFunction, Request, Response, Router } from 'express';

import { BaseRouter } from './route';
import { debug } from '../util/debug';

/**
 * Admin router.
 */
export class AdminRouter extends BaseRouter {

  constructor (router: Router) {
    super(router, 'admin');
  }

  /**
   * Create the index routes.
   */
  public init () {
    debug('[AdminRouter::create] Creating admin routes.');

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
    res.send('Welcome to the Gizmo Express Admin API!');
  }
}
