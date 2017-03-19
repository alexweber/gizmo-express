import chai = require('chai');
import config = require('config');
import express = require('express');

// Mongoose mocking.
import mongoose = require('mongoose');
const Mockgoose = require('mockgoose').Mockgoose;
const mockgoose = new Mockgoose(mongoose);

const expect = chai.expect;
import { getServer } from '../bootstrap';

import { DummyCrudRouter } from '../fixtures/dummyRouters';
import { DummyController } from '../fixtures/dummyControllers';

describe('CrudRouter', function () {
  const url = '/v1/foo';
  let app, router;

  before(done => {
    mongoose.disconnect();
    mockgoose.prepareStorage().then(function () {
      mongoose.connect('mongodb://example.com/TestingDB', function (err) {
        done(err);
      });
    });
  });

  beforeEach(done => {
    const server = getServer();
    app = server.app;
    router = server.router;
    mockgoose.helper.reset().then(() => {
      done()
    });
  });

  after(done => {
    mongoose.disconnect(function (err) {
      done(err);
    });
  });

  describe("doesn't have crud routes to begin with", function () {

    it("doesn't have GET /", function () {
      return chai.request(app).get(url).then(() => {
        expect(false).to.equal(true);
      }).catch(err => {
        expect(err.status).to.equal(404);
      });
    });

    it("doesn't have GET /:id", function () {
      return chai.request(app).get(`${url}/123`).then(() => {
        expect(false).to.equal(true);
      }).catch(err => {
        expect(err.status).to.equal(404);
      });
    });

    it("doesn't have POST /", function () {
      return chai.request(app).post(url).then(() => {
        expect(false).to.equal(true);
      }).catch(err => {
        expect(err.status).to.equal(404);
      });
    });

    it("doesn't have PUT /:id", function () {
      return chai.request(app).put(`${url}/123`).then(() => {
        expect(false).to.equal(true);
      }).catch(err => {
        expect(err.status).to.equal(404);
      });
    });

    it("doesn't have DELETE /:id", function () {
      return chai.request(app).del(`${url}/123`).then(() => {
        expect(false).to.equal(true);
      }).catch(err => {
        expect(err.status).to.equal(404);
      });
    });
  });

  describe('generates crud routes', function () {
    let dummyRouter, controller;

    beforeEach(() => {
      dummyRouter = new DummyCrudRouter(router);
      controller = new DummyController();
      dummyRouter.createCrud('foo', controller);
    });

    it('generates GET/', function () {
      return chai.request(app).get(url).then(res => {
        expect(res.status).to.equal(200);
      });
    });

    it('generates GET/:id', function () {
      return chai.request(app).get(`${url}/123`).then(res => {
        expect(res.status).to.equal(200);
      });
    });

    it('generates POST/', function () {
      return chai.request(app).post(url).then(res => {
        expect(res.status).to.equal(200);
      });
    });

    it('generates PUT/:id', function () {
      return chai.request(app).put(`${url}/123`).then(res => {
        expect(res.status).to.equal(200);
      });
    });

    it('generates DELETE/:id', function () {
      return chai.request(app).del(`${url}/123`).then(res => {
        expect(res.status).to.equal(200);
      });
    });
  });
});
