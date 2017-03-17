import { Document, Types, PaginateResult } from 'mongoose';

import { ICrudController } from '../../src/controllers/interfaces/crud.interface';
import { SearchController } from '../../src/controllers/searchController';
import { PagedSearchController } from '../../src/controllers/pagedSearchController';
import { ISearchParams } from '../../src/routes/interfaces/searchParams.interface';

export class DummyController implements ICrudController {

  load (id: Types.ObjectId, lean?: boolean): Promise<Document|Object> {
    return Promise.resolve(null);
  }

  loadAll (lean?: boolean): Promise<(Document|Object)[]> {
    return Promise.resolve([]);
  }

  create (data: Object, lean?: boolean): Promise<Document|Object> {
    return Promise.resolve(data);
  }

  update (id: Types.ObjectId, data: Object, lean?: boolean): Promise<Document|Object> {
    return Promise.resolve(data);
  }

  remove (id: Types.ObjectId): Promise<void> {
    return Promise.resolve(null);
  }

  save (conditions: Object, data: Object, upsert?: boolean, lean?: boolean): Promise<Document|Object> {
    return Promise.resolve(data);
  }
}

export class DummySearchController extends SearchController {}

export class DummyPagedSearchController extends PagedSearchController {
  findPaged (params: ISearchParams, lean?: boolean): Promise<PaginateResult<Document>> {
    return Promise.resolve({
      docs: [],
      total: 0,
      limit: 10
    });
  }
}
