import { Document, Types } from 'mongoose';

import { IController } from './controller.interface';

export interface ICrudController extends IController {

  /**
   * Creates a document.
   *
   * @param data {Object}
   * @param lean {boolean} Whether to return a plain object instead of a full Mongoose Document.
   *
   * @return {Promise<Document|Object>} The saved document.
   */
  create (data: Object, lean?: boolean): Promise<Document|Object>;

  /**
   * Updates a document.
   *
   * @param id {Types.ObjectId} Mongoose _id.
   * @param data {Object}
   * @param lean {boolean} Whether to return a plain object instead of a full Mongoose Document.
   *
   * @return {Promise<Document|Object>} The saved document.
   */
  update (id: Types.ObjectId, data: Object, lean?: boolean): Promise<Document|Object>;

  /**
   * Removes a document.
   *
   * @param id {Types.ObjectId} Mongoose _id.
   *
   * @return {Promise<void>} A promise that will complete if the deletion was successfull.
   */
  remove (id: Types.ObjectId): Promise<void>;

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
  save (conditions: Object, data: Object, upsert?: boolean, lean?: boolean): Promise<Document|Object>;
}
