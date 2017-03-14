// Bootstrap tests.

import chai = require('chai');
import sinon = require('sinon');

// Chai plugins.
import chaiHttp = require('chai-http');
chai.use(chaiHttp);

import sinonChai = require('sinon-chai');
chai.use(sinonChai);

// Sinon plugins.
const sinonStubPromise = require('sinon-stub-promise');
sinonStubPromise(sinon);

// Convenience.
import { Server } from '../src/server';

export function getServer () {
  return Server.bootstrap();
}

// @TODO truncate db and re-seed?
