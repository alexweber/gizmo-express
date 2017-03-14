import mongoose = require('mongoose');
import { Document, Query, Types } from 'mongoose';

import { BaseController } from './baseController';

export abstract class CrudController extends BaseController {

  /**
   * Creates a document.
   *
   * @param data {Object}
   * @param lean {boolean} Whether to return a plain object instead of a full Mongoose Document.
   *
   * @return {Promise<Document|Object>} The saved document.
   */
  public abstract create (data: Object, lean?: boolean): Promise<Document|Object>;

  /**
   * Updates a document.
   *
   * @param id {Types.ObjectId} Mongoose _id.
   * @param data {Object}
   * @param lean {boolean} Whether to return a plain object instead of a full Mongoose Document.
   *
   * @return {Promise<Document|Object>} The saved document.
   */
  public abstract update (id: Types.ObjectId, data: Object, lean?: boolean): Promise<Document|Object>;

  /**
   * Removes a document.
   *
   * @param id {Types.ObjectId} Mongoose _id.
   *
   * @return {Promise<boolean>} Whether the deletion was successfull.
   */
  public abstract remove (id: Types.ObjectId): Query<void>;

  /**
   * Convenience method to create or save a document.
   *
   * @param conditions {Object}
   * @param data {Object}
   * @param [upsert] {boolean} Whether to upsert.
   * @param lean {boolean} Whether to return a plain object instead of a full Mongoose Document.
   *
   * @return {Promise<Document|Object>} The saved document.
   */
  public abstract save (conditions: Object, data: Object, upsert?: boolean, lean?: boolean): Promise<Document|Object>;
}
