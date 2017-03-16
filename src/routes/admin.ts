import { NextFunction, Request, Response, Router } from 'express';

import { CrudRouter } from './crud';
import { debug } from '../util/debug';

import RoleController from '../controllers/roleController';
import UserController from '../controllers/userController';

/**
 * Admin router.
 */
export class AdminRouter extends CrudRouter {
  public roleController: RoleController;
  public userController: UserController;

  constructor (router: Router) {
    super(router, 'admin');
    this.roleController = new RoleController();
    this.userController = new UserController();
  }

  /**
   * Create the index routes.
   */
  public init () {
    debug('[AdminRouter::create] Creating admin routes.');

    // Default route.
    this.router.get(this.prefix, (req: Request, res: Response, next: NextFunction) => {
      res.send('Welcome to the Gizmo Express Admin API!');
    });

    // Roles.
    this.createCrud('roles', this.roleController);

    // Users.
    this.createCrud('users', this.userController);
  }
}
