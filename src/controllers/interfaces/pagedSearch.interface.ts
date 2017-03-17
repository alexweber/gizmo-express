import { Controller } from './controller.interface';
import { SearchParams } from '../../routes/searchParamsInterface';

export interface PagedSearchController extends Controller {

  /**
   * Finds documents paged.
   *
   * @param params {SearchParams}
   * @param lean {boolean} Whether to return plain objects instead of full Mongoose Documents.
   *
   * @return {Promise<(Document|Object)[]>} The found documents, if any.
   */
  findPaged (params: SearchParams, lean?: boolean): Promise<(Document|Object)[]>;
}
