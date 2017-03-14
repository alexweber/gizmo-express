import mongoose = require('mongoose');
import { Document, Types }  from 'mongoose';

export abstract class BaseController {

  /**
   * Loads a document by id.
   *
   * @param id {Types.ObjectId} Mongoose _id.
   * @param lean {boolean} Whether to return a plain object instead of a full Mongoose Document.
   *
   * @return {Promise<Document|Object>}>
   */
  public abstract load (id: Types.ObjectId, lean?: boolean): Promise<Document|Object>;

  /**
   * Loads all documents.
   *
   * @param lean {boolean} Whether to return a plain object instead of a full Mongoose Document.
   *
   * @return {Promise<(Document|Object)[]>}>
   */
  public abstract loadAll (lean?: boolean): Promise<(Document|Object)[]>;
}
