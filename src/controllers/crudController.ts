import { BaseController } from './baseController';
import { Query } from 'mongoose';

export abstract class CrudController extends BaseController {

  /**
   * Creates a document.
   *
   * @param data {Object}
   *
   * @return {Promise<Object>} The saved document, converted to an object.
   */
  public abstract create (data: Object): Promise<Object>;

  /**
   * Saves a document.
   *
   * @param conditions {Object}
   * @param data {Object}
   * @param [upsert] {boolean} Whether to upsert or just save.
   *
   * @return {Promise<Object>} The saved document, converted to an object.
   */
  public abstract save (conditions: Object, data: Object, upsert?: boolean): Promise<Object>;

  /**
   * Removes a document.
   *
   * @param conditions
   *
   * @return {Promise<boolean>} Whether the deletion was successfull.
   */
  public abstract remove (conditions: Object): Query<void>;
}
