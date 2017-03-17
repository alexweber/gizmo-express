import { IController } from './controller.interface';
import { ISearchParams } from '../../routes/interfaces/searchParams.interface';

export interface IPagedSearchController extends IController {

  /**
   * Finds documents paged.
   *
   * @param params {ISearchParams}
   * @param lean {boolean} Whether to return plain objects instead of full Mongoose Documents.
   *
   * @return {Promise<(Document|Object)[]>} The found documents, if any.
   */
  findPaged (params: ISearchParams, lean?: boolean): Promise<(Document|Object)[]>;
}
