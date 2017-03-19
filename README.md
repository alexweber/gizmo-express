# Gizmo Express

> An opinionated Express REST API starter using Typescript and Mongoose.

## Overview
* 100% Typescript
* Express 4 REST API server boilerplate
* Built for an Angular 2+ backend
* Simple and easy to work with
* Comprehensive test-suite with 150+ tests and >90% code coverage

## Features
* Smart [config](https://github.com/lorenwest/node-config) management
* Dynamic CRUD routes for arbitrary resources
* Robust [acl](https://github.com/OptimalBits/node_acl) (_in progress_)
* Powerful caching with [apicache](https://github.com/kwhitley/apicache) and optional [Redis](https://redis.io/) support   
* Data seeding (_in progress_)
* Sane rate limiting (_in progress_)

### Install/Run

1. Make sure [Yarn](https://yarnpkg.com/) is installed`npm install -g yarn` or follow the [install instructions](https://yarnpkg.com/lang/en/docs/install/)
2. Run `yarn` to install dependencies
3. Run one of:
    * `yarn start` to run in production
    * `yarn dev` to start a local dev server
    * `yarn test` to run tests
    * `yarn lint` to lint code

#### Caveats

* Waiting on Angular 4 Universal updates before actually integrating it
* Typescript compilation into /dist/src and /dist/test is fugly, maybe Angular 4 CLI will have a solution?
* Not actually used in production yet, TDD all the way
