import { Document } from 'mongoose';

import { IController } from './controller.interface';
import { ISearchParams } from '../../routes/interfaces/searchParams.interface';

export interface ISimpleSearchController extends IController {

  /**
   * Finds documents.
   *
   * @param params {ISearchParams}
   *
   * @return {Promise<(Document|Object)[]>} The found documents, if any.
   */
  find (params: ISearchParams): Promise<(Document | Object)[]>;
}
