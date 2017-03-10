import path = require('path');
import fs = require('fs');

import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as logger from 'morgan';
import * as helmet from 'helmet';
import * as compression from 'compression';
import errorHandler = require('errorhandler');

import { debug } from './util/debug';
import { Connection } from 'mongoose';
import mongoose = require('mongoose');
import config = require('config');

// Mongoose options.
const mongooseOptions = {
  // Use native ES6 promises.
  promiseLibrary: Promise,
  // Use native parser.
  db: { native_parser: true },
  // Use nearest replica set for reads.
  replset: {
    auto_reconnect: true,
    readPreference: 'ReadPreference.NEAREST'
  }
};
mongoose.Promise = Promise;
const mongooseModels = path.join(__dirname, '/models');
import { IndexRoute } from './routes/index';

/**
 * The server.
 */
export class Server {

  public app: express.Application;

  public db: Connection;

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
    fs.readdirSync(mongooseModels)
      .filter(file => ~file.search(/^[^\.].*\.model.js$/))
      .forEach(file => require(path.join(mongooseModels, file)));

    // Debug mode.
    if (config.has('db.debug') && config.get('db.debug')) {
      mongoose.set('debug', true);
    }

    // Connect to mongo.
    mongoose.connect(<string>config.get('db.dsn'), mongooseOptions);

    this.db = mongoose.connection;

    this.db.on('error', err => {
      debug(`[db]: ${err}`);
    });

    this.db.once('open', () => {
      debug('Connected to MongoDB!');
    });
  }

  /**
   * Init client app.
   */
  private client () {
    // Serve client app statically.
    this.app.use(express.static(path.join(__dirname, 'public')));

    // For all other GET requests, send back index.html so that PathLocationStrategy can be used.
    this.app.get('/*', function (req, res) {
      res.sendFile(path.join(__dirname + 'public/index.html'));
    });
  }
}
