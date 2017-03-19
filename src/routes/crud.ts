import { NextFunction, Request, Response } from 'express';

import { BaseRouter } from './base';
import { ICrudController } from '../controllers/interfaces/crud.interface';
import sanitize from '../util/sanitize';

export abstract class CrudRouter extends BaseRouter {

  /**
   * Generate CRUD routes.
   *
   * @param name {String} The name to use as a path prefix.
   * @param controller {ICrudController} The controller to use.
   */
  createCrud (name: string, controller: ICrudController) {

    // Load all items.
    this.router.get(`${this.prefix}/${name}`, (req: Request, res: Response, next: NextFunction) => {
      controller.loadAll().then(items => {
        res.json(items);
      }).catch(this.errorHandler);
    });

    // Load a single item.
    this.router.get(`${this.prefix}/${name}/:id`, (req: Request, res: Response, next: NextFunction) => {
      controller.load(sanitize(req.params.id)).then(item => {
        res.json(item);
      }).catch(this.errorHandler);
    });

    // Create a new item.
    this.router.post(`${this.prefix}/${name}`, (req: Request, res: Response, next: NextFunction) => {
      controller.create(sanitize(req.body)).then(item => {
        res.json(item);
      }).catch(this.errorHandler);
    });

    // Update an existing item.
    this.router.put(`${this.prefix}/${name}/:id`, (req: Request, res: Response, next: NextFunction) => {
      controller.update(sanitize(req.params.id), sanitize(req.body)).then(item => {
        res.json(item);
      }).catch(this.errorHandler);
    });

    // Delete an existing item.
    this.router.delete(`${this.prefix}/${name}/:id`, (req: Request, res: Response, next: NextFunction) => {
      controller.remove(sanitize(req.params.id)).then(() => {
        res.sendStatus(200);
      }).catch(this.errorHandler);
    });
  }
}
