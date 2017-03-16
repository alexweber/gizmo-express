import path = require('path');
import fs = require('fs');

import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as logger from 'morgan';
import * as helmet from 'helmet';
import * as compression from 'compression';
import errorHandler = require('errorhandler');
import { debug } from './util/debug';
import mongoose = require('mongoose');
import { Connection } from 'mongoose';
import config = require('config');

import { IndexRouter } from './routes/index';
import { AdminRouter } from './routes/admin';
import { BaseRouter } from './routes/route';

/**
 * The server.
 */
export class Server {

  /**
   * The Express application instance.
   */
  public app: express.Application;

  /**
   * The Mongoose connection instance.
   */
  public db: Connection;

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

    // Add API routes.
    this.routes();

    /// Init client app.
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

    // Mount json form parser.
    this.app.use(bodyParser.json());

    // Mount query string parser.
    this.app.use(bodyParser.urlencoded({
      extended: true
    }));

    // @TODO validator/sanitizer.

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
    const router: express.Router = express.Router();

    // Add route handlers.
    this.routeHandlers['index'] = new IndexRouter(router);
    this.routeHandlers['admin'] = new AdminRouter(router);

    // Init route handlers.
    Object.keys(this.routeHandlers).forEach(key => {
      this.routeHandlers[key].init();
    });

    // Use router middleware.
    this.app.use(router);
  }

  /**
   * Init database.
   */
  private database () {
    // Help avoiding topology destroyed errors.
    const mongooseSocketOptions = {
      keepAlive: 1,
      connectTimeoutMS: 30000
    };

    // Mongoose options.
    const mongooseOptions = {
      // Use native ES6 promises.
      promiseLibrary: Promise,
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
      .filter(file => file.substr(-4) === '.js')
      .forEach(file => require(path.join(mongooseModels, file)));

    // Debug mode.
    if (config.has('db.debug') && config.get('db.debug')) {
      mongoose.set('debug', true);
    }

    // Finally, connect to Mongo.
    mongoose.createConnection(<string>config.get('db.dsn'), mongooseOptions);

    // Store connection for retrieval.
    this.db = mongoose.connection;

    this.db.on('error', err => {
      debug(`[db] ${err}`);
    });

    this.db.once('open', () => {
      debug('[db] Connected to MongoDB!');
    });
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
  public getRouteHandler (name: string): BaseRouter|false {
    return this.routeHandlers.hasOwnProperty(name) ? this.routeHandlers[name] : false;
  }
}
