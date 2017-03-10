import { NextFunction, Request, Response, Router } from 'express';

import { BaseRouter } from './route';
import { debug } from '../util/debug';

/**
 * Index router.
 */
export class IndexRouter extends BaseRouter {

  /**
   * Create the routes.
   *
   * @class IndexRoute
   * @method create
   * @static
   */
  public static create (router: Router) {
    debug('[IndexRouter::create] Creating index routes.');

    //add home page route
    router.get('/', (req: Request, res: Response, next: NextFunction) => {
      new IndexRouter().index(req, res, next);
    });
  }

  /**
   * The atual index route.
   *
   * @class IndexRoute
   * @method index
   * @param req {Request} The express Request object.
   * @param res {Response} The express Response object.
   * @next {NextFunction} Execute the next method.
   */
  public index (req: Request, res: Response, next: NextFunction) {

  }
}
