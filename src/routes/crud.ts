import { NextFunction, Request, Response, Router } from 'express';
import { PaginateOptions } from 'mongoose';

import { BaseRouter } from './base';
import { CrudController } from '../controllers/crudController';

export abstract class CrudRouter extends BaseRouter {

  createCrud (name: string, controller: CrudController) {
    // Load all items.
    this.router.get(`${this.prefix}/${name}`, (req: Request, res: Response, next: NextFunction) => {
      controller.loadAll().then(items => {
        res.json(items);
      }).catch(this.errorHandler);
    });

    // Load a single item.
    this.router.get(`${this.prefix}/${name}/:id`, (req: Request, res: Response, next: NextFunction) => {
      // @TODO sanitize
      controller.load(req.params.id).then(item => {
        res.json(item);
      }).catch(this.errorHandler);
    });

    // Create a new item.
    this.router.post(`${this.prefix}/${name}`, (req: Request, res: Response, next: NextFunction) => {
      // @TODO sanitize
      controller.create(req.body).then(item => {
        res.json(item);
      }).catch(this.errorHandler);
    });

    // Update an existing item.
    this.router.put(`${this.prefix}/${name}/:id`, (req: Request, res: Response, next: NextFunction) => {
      // @TODO sanitize
      controller.update(req.params.id, req.body).then(item => {
        res.json(item);
      }).catch(this.errorHandler);
    });

    // Delete an existing item.
    this.router.delete(`${this.prefix}/${name}/:id`, (req: Request, res: Response, next: NextFunction) => {
      // @TODO sanitize
      controller.remove(req.params.id).then(() => {
        res.sendStatus(200);
      }).catch(this.errorHandler);
    });
  }

  // @TODO searching and filtering.

  /**
   * Helper to build mongoose pagination options.
   *
   * @param page {number} The current page
   * @param limit {number} How many items per page
   * @param sort {Object|string} Query sorts.
   * @param select {Object|string} Query projection.
   * @param populate {Object} References to populate.
   * @returns {PaginateOptions}
   */
  getPaginationOptions (
    page: number, limit: number, sort: Object|string, select: Object|string, populate: Object
  ): PaginateOptions {
    let populateOptions = [];
    let sortTemp = Object.assign({}, sort);

    if (populate) {
      let populatedSorts = {};

      Object.keys(sort).forEach(key => {
        if (key.indexOf('.') !== -1) {
          const temp = key.split('.');
          populatedSorts[temp[0]] = {};
          populatedSorts[temp[0]][temp[1]] = sort[key];
          delete sortTemp[key];
        }
      });

      Object.keys(populate).forEach(key => {
        let params: any = {
          path: key,
          select: populate[key]
        };

        if (sort && populatedSorts.hasOwnProperty(key)) {
          params.options = { sort: populatedSorts[key] };
        }

        populateOptions.push(params);
      });
    }

    let options: PaginateOptions = {
      lean: true,
      leanWithId: false,
      limit,
      offset: (page - 1) * limit
    };

    if (select) {
      options.select = select;
    }

    if (sort) {
      options.sort = sort;
    }

    if (populate) {
      options.populate = populate;
    }

    return options;
  }
}
