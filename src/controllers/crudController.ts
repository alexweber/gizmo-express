import mongoose = require('mongoose');
import { Query, Types } from 'mongoose';

import { BaseController } from './baseController';

export abstract class CrudController extends BaseController {

  /**
   * Creates a document.
   *
   * @param data {Object}
   * @param lean {boolean} Whether to return a plain object instead of a full Mongoose Document.
   *
   * @return {Promise<Object>} The saved document, converted to a plain object.
   */
  public abstract create (data: Object, lean: boolean): Promise<Object>;

  /**
   * Removes a document.
   *
   * @param id {Types.ObjectId} Mongoose _id.
   *
   * @return {Promise<boolean>} Whether the deletion was successfull.
   */
  public abstract remove (id: Types.ObjectId): Query<void>;

  /**
   * Saves a document.
   *
   * @param conditions {Object}
   * @param data {Object}
   * @param [upsert] {boolean} Whether to upsert or just save.
   *
   * @return {Promise<Object>} The saved document, converted to a plain object.
   */
  public abstract save (conditions: Object, data: Object, upsert?: boolean): Promise<Object>;
}
