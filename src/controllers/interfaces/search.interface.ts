import mongoose = require('mongoose');
import { Document } from 'mongoose';

import { Controller } from './controller.interface';
import { SearchParams } from '../../routes/searchParamsInterface';

export interface SearchController extends Controller {

  /**
   * Finds documents.
   *
   * @param params {SearchParams}
   * @param lean {boolean} Whether to return plain objects instead of full Mongoose Documents.
   *
   * @return {Promise<(Document|Object)[]>} The found documents, if any.
   */
  find (params: SearchParams, lean?: boolean): Promise<(Document|Object)[]>;
}
