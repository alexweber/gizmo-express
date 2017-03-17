import { BaseRouter } from '../../src/routes/base';
import { CrudRouter } from '../../src/routes/crud';

export class DummyRouter extends BaseRouter {
  init () {
    // Do nothing.
  }
}

export class DummyCrudRouter extends CrudRouter {
  init () {
    // Do nothing.
  }
}
