import { Document, PaginateResult } from 'mongoose';

import { IController } from './controller.interface';
import { ISearchParams } from '../../routes/interfaces/searchParams.interface';

export interface IPagedSearchController extends IController {

  /**
   * Finds documents paged.
   *
   * @param params {ISearchParams}
   * @param lean {boolean} Whether to return plain objects instead of full Mongoose Documents.
   *
   * @return {Promise<PaginateResult<IUser>>} The paged search result.
   */
  findPaged (params: ISearchParams, lean?: boolean): Promise<PaginateResult<Document>>;
}
