import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as logger from 'morgan';
import * as path from 'path';
import errorHandler = require('errorhandler');

import { IndexRoute } from './routes/index';

/**
 * The server.
 *
 * @class Server
 */
export class Server {

  public app: express.Application;

  /**
   * Bootstrap the application.
   *
   * @method bootstrap
   * @static
   * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
   */
  public static bootstrap (): Server {
    return new Server();
  }

  /**
   * Constructor.
   *
   * @constructor
   */
  constructor () {
    //create expressjs application
    this.app = express();

    //configure application
    this.config();

    //add routes
    this.routes();
  }

  /**
   * Configure application
   *
   * @class Server
   * @method config
   */
  public config () {
    //add static paths
    this.app.use(express.static(path.join(__dirname, "public")));

    //mount logger
    this.app.use(logger('dev'));

    //mount json form parser
    this.app.use(bodyParser.json());

    //mount query string parser
    this.app.use(bodyParser.urlencoded({
      extended: true
    }));

    // catch 404 and forward to error handler
    this.app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
      err.status = 404;
      next(err);
    });

    //error handling
    // @TODO check if dev & import conditionally
    this.app.use(errorHandler());
  }

  /**
   * Create and return Router.
   *
   * @class Server
   * @method config
   * @return void
   */
  private routes () {
    let router: express.Router;
    router = express.Router();

    //IndexRoute
    IndexRoute.create(router);

    //use router middleware
    this.app.use(router);
  }

}
