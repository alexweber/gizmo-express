import mongoose = require('mongoose');
import { Document, Query, Types } from 'mongoose';

import { BaseController } from './baseController';

export abstract class SearchController extends BaseController {

  /**
   * Finds documents.
   *
   * @param data {Object}
   * @param lean {boolean} Whether to return plain objects instead of full Mongoose Documents.
   *
   * @return {Promise<Document|Object>} The found documents, if any.
   */
  public abstract find (data: Object, lean?: boolean): Promise<Document|Object>;

  /**
   * Finds documents.
   *
   * @param data {Object}
   * @param lean {boolean} Whether to return plain objects instead of full Mongoose Documents.
   *
   * @return {Promise<Document|Object>} The found documents, if any.
   */
  public abstract findPaged (data: Object, lean?: boolean): Promise<Document|Object>;
}
