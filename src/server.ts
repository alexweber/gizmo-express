import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as logger from 'morgan';
import * as path from 'path';
import * as helmet from 'helmet';
import * as compression from 'compression';
import errorHandler = require('errorhandler');

import { IndexRoute } from './routes/index';

/**
 * The server.
 */
export class Server {

  public app: express.Application;

  /**
   * Bootstrap the application.
   */
  public static bootstrap (): Server {
    return new Server();
  }

  /**
   * Constructor.
   */
  constructor () {
    // Init express.
    this.app = express();

    // Configure server.
    this.config();

    // Init database.
    this.database();

    // Add API routes.
    this.routes();

    // Serve client app.
    this.app.use(express.static(path.join(__dirname, 'public')));
  }

  /**
   * Configure application.
   */
  public config () {
    // First things first, put on our helmet.
    this.app.use(helmet());

    // Mount logger.
    this.app.use(logger('dev'));

    // Mount json form parser.
    this.app.use(bodyParser.json());

    // Mount query string parser.
    this.app.use(bodyParser.urlencoded({
      extended: true
    }));

    // @TODO validator.

    // Use compression.
    this.app.use(compression());

    // Catch 404 and forward to error handler.
    this.app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
      err.status = 404;
      next(err);
    });

    // Error handling.
    // @TODO check if dev & import conditionally
    this.app.use(errorHandler());
  }

  /**
   * Create and init Router.
   */
  private routes () {
    let router: express.Router;
    router = express.Router();

    // IndexRoute.
    IndexRoute.create(router);

    // Use router middleware.
    this.app.use(router);
  }

  /**
   * Init database.
   */
  private database () {

  }
}
