// Bootstrap tests.

import * as chai from 'chai';

// Enable Chai plugins.
import chaiHttp = require('chai-http');
chai.use(chaiHttp);

import sinonChai = require('sinon-chai');
chai.use(sinonChai);

// Convenience.
import app from '../src/server';
export default app;
