import * as path from 'path';
import * as fs from 'fs';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as logger from 'morgan';
import * as helmet from 'helmet';
import * as compression from 'compression';
import * as config from 'config';
import * as errorHandler from 'errorhandler';
import * as acl from 'acl';
import mongoose = require('mongoose');
import { Connection } from 'mongoose';

import { debug } from './util/debug';
import { IndexRouter } from './routes/index';
import { AdminRouter } from './routes/admin';
import { BaseRouter } from './routes/base';

/**
 * The server.
 */
export class Server {

  /**
   * The Express application instance.
   */
  public app: express.Application;

  /**
   * The Express Router instance.
   */
  public router: express.Router;

  /**
   * The Mongoose connection instance.
   */
  public db: Connection;

  /**
   *
   */
  public acl: any;

  /**
   * Initialized route handlers.
   */
  private routeHandlers: { [prop: string]: BaseRouter } = {};

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

    // Init ACL.
    this.permissions();

    // Init routes.
    this.routes();

    // Init client app.
    this.client();
  }

  /**
   * Configure application.
   */
  public config () {
    // First things first, put on our helmet.
    this.app.use(helmet());

    // Mount logger.
    this.app.use(logger('dev'));

    // Mount JSON form parser.
    this.app.use(bodyParser.json());

    // Mount query string parser.
    this.app.use(bodyParser.urlencoded({
      extended: true
    }));

    // Use compression.
    this.app.use(compression());

    // Catch 404 and forward to error handler.
    this.app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
      err.status = 404;
      next(err);
    });

    // Error handling.
    if (this.app.get('env') !== 'production') {
      this.app.use(errorHandler());
    } else {
      // @TODO prod error handling.
    }
  }

  /**
   * Create and init Router.
   */
  private routes () {
    const router: express.Router = express.Router();

    // Add route handlers.
    this.routeHandlers['index'] = new IndexRouter(router);
    this.routeHandlers['admin'] = new AdminRouter(router);

    // Init route handlers.
    Object.keys(this.routeHandlers).forEach(key => {
      this.routeHandlers[key].init();
    });

    this.router = router;

    // Use router middleware.
    this.app.use(router);
  }

  /**
   * Init database.
   */
  private database () {
    // Debug mode.
    if (config.has('db.debug')) {
      mongoose.set('debug', config.get('db.debug'));
    }

    // Help avoiding topology destroyed errors.
    const mongooseSocketOptions = {
      keepAlive: 1,
      connectTimeoutMS: 30000
    };

    // Mongoose options.
    const mongooseOptions = {
      // Use native ES6 promises.
      promiseLibrary: global.Promise,
      // Use native parser.
      db: { native_parser: true },
      server: {
        socketOptions: mongooseSocketOptions
      },
      replset: {
        auto_reconnect: true,
        // Use nearest replica set for reads.
        readPreference: 'ReadPreference.NEAREST',
        socketOptions: mongooseSocketOptions
      }
    };

    mongoose.Promise = Promise;

    // Path to models.
    const mongooseModels = path.join(__dirname, '/models');

    // Init models recursively.
    fs.readdirSync(mongooseModels)
      .filter(file => file.substr(-3) === '.js')
      .forEach(file => require(path.join(mongooseModels, file)));

    // Finally, connect to Mongo and Store connection.
    mongoose.connect(<string>config.get('db.dsn'), mongooseOptions);

    this.db = mongoose.connection;

    this.db.on('error', err => {
      if (this.app.get('env') !== 'test') {
        debug(`[db] ${err}`);
      }
    });

    this.db.once('open', () => {
      debug('[db] Connected to MongoDB!');
    });
  }

  /**
   * Init Access Control Layer.
   */
  private permissions () {
    //noinspection JSPotentiallyInvalidConstructorUsage
    this.acl = new acl(new acl.memoryBackend());

    // @TODO init ACL crap.
  }

  /**
   * Init client app.
   */
  private client () {
    // Serve client app statically.
    this.app.use(express.static(path.join(__dirname, '../../public')));

    // For all other GET requests, send back index.html so that PathLocationStrategy can be used.
    this.app.get('/*', function (req, res) {
      res.sendFile(path.join(__dirname + '/../../public/index.html'));
    });
  }

  /**
   * Returns the registered route handler for a given name or false if it doesn't exist.
   * This is used for testing purposes only.
   *
   * @param name {String}
   * @returns {BaseRouter|boolean}
   */
  public getRouteHandler (name: string): BaseRouter | false {
    return this.routeHandlers[name] || false;
  }
}
