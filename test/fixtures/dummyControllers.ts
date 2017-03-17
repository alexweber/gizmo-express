import { Document, Types } from 'mongoose';

import { ICrudController } from '../../src/controllers/interfaces/crud.interface';
import { Query } from 'mongoose';

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
