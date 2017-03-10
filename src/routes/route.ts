import { NextFunction, Request, Response, Router } from 'express';

/**
 * Constructor
 *
 * @class BaseRoute
 */
export abstract class BaseRouter {

  /**
   * Initialize our routes.
   */
  public static init (router: Router) {
    // Add routes in implementations.
  }


}
