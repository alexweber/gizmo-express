import mongoose = require('mongoose');
import { Document } from 'mongoose';

import { IController } from './controller.interface';
import { ISearchParams } from '../../routes/interfaces/searchParams.interface';

export interface ISearchController extends IController {

  /**
   * Finds documents.
   *
   * @param params {ISearchParams}
   * @param lean {boolean} Whether to return plain objects instead of full Mongoose Documents.
   *
   * @return {Promise<(Document|Object)[]>} The found documents, if any.
   */
  find (params: ISearchParams, lean?: boolean): Promise<(Document|Object)[]>;
}
