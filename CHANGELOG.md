# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="0.2.0"></a>
# [0.2.0](https://bitbucket.org/alexweber/gizmo-express/compare/v0.1.0...v0.2.0) (2017-03-27)


### Bug Fixes

* automatic model discovery logic ([b057398](https://bitbucket.org/alexweber/gizmo-express/commits/b057398))
* mongoose model already compiled edge case erorr ([0bb5533](https://bitbucket.org/alexweber/gizmo-express/commits/0bb5533))
* mongoose model auto-discovery ([27f5235](https://bitbucket.org/alexweber/gizmo-express/commits/27f5235))
* setting mongoose debug mode from config ([31eb6b4](https://bitbucket.org/alexweber/gizmo-express/commits/31eb6b4))
* **controllers:** PageSearchedController proper lean option default handing ([79a0f81](https://bitbucket.org/alexweber/gizmo-express/commits/79a0f81))


### Code Refactoring

* move lean option to ISearchParams ([fc179e2](https://bitbucket.org/alexweber/gizmo-express/commits/fc179e2))


### Features

* add simple sanitizer util ([6792088](https://bitbucket.org/alexweber/gizmo-express/commits/6792088))
* buildout simple sanitizer util ([8119db4](https://bitbucket.org/alexweber/gizmo-express/commits/8119db4))
* ensure all tests pass before releasing a new version ([84b4cfc](https://bitbucket.org/alexweber/gizmo-express/commits/84b4cfc))
* lint code before testing ([319215b](https://bitbucket.org/alexweber/gizmo-express/commits/319215b))
* support apicache redis via config ([f0c34d5](https://bitbucket.org/alexweber/gizmo-express/commits/f0c34d5))
* use sanitize util wherever applicable ([ca9c7b3](https://bitbucket.org/alexweber/gizmo-express/commits/ca9c7b3))
* **controllers:** add setParams() helper to reduce code duplication for simple search controllers ([81c3c94](https://bitbucket.org/alexweber/gizmo-express/commits/81c3c94))
* **util:** xss filtering using DOMPurify ([9b86e55](https://bitbucket.org/alexweber/gizmo-express/commits/9b86e55))


### BREAKING CHANGES

* The "lean" 2nd argument to find() and findPaged() has been removed and merged into the first argument



<a name="0.1.0"></a>
# 0.1.0 (2017-03-18)


### Bug Fixes

* allow empty params in paged searches ([8f79ee9](https://bitbucket.org/alexweber/gizmo-express/commit/8f79ee9))
* more definitve fix for mongoose connection handling during tests ([df35894](https://bitbucket.org/alexweber/gizmo-express/commit/df35894))
* multiple connection handling for tests ([51cbfbe](https://bitbucket.org/alexweber/gizmo-express/commit/51cbfbe))
* only require model files in db bootstrap ([7775655](https://bitbucket.org/alexweber/gizmo-express/commit/7775655))
* paged search controller logic ([c77cc95](https://bitbucket.org/alexweber/gizmo-express/commit/c77cc95))
* paged search controller options logic ([c1740e1](https://bitbucket.org/alexweber/gizmo-express/commit/c1740e1))
* path location strategy redirect path ([29e8fcc](https://bitbucket.org/alexweber/gizmo-express/commit/29e8fcc))
* server bootstrap, www and tests working together ([443f2e6](https://bitbucket.org/alexweber/gizmo-express/commit/443f2e6))


### Features

* add bin and src from contrib starter ([82d7273](https://bitbucket.org/alexweber/gizmo-express/commit/82d7273))
* add comprehensive tests for environment util ([3ab205f](https://bitbucket.org/alexweber/gizmo-express/commit/3ab205f))
* add default projection to search controller ([dc96241](https://bitbucket.org/alexweber/gizmo-express/commit/dc96241))
* add environment utils ([9a467f3](https://bitbucket.org/alexweber/gizmo-express/commit/9a467f3))
* add initial tests for debug util ([7c1340f](https://bitbucket.org/alexweber/gizmo-express/commit/7c1340f))
* add mongoose paginate plugin to user model ([19c388a](https://bitbucket.org/alexweber/gizmo-express/commit/19c388a))
* add release script using standard-version ([b931a2b](https://bitbucket.org/alexweber/gizmo-express/commit/b931a2b))
* add tests for abstract search controller ([d16fab6](https://bitbucket.org/alexweber/gizmo-express/commit/d16fab6))
* add tests for base router ([eae1cfb](https://bitbucket.org/alexweber/gizmo-express/commit/eae1cfb))
* allow empty params for paged find ([4b0f418](https://bitbucket.org/alexweber/gizmo-express/commit/4b0f418))
* configure tslint and add script ([7986c23](https://bitbucket.org/alexweber/gizmo-express/commit/7986c23))
* crud route and controller polish, tests ([bafb7d7](https://bitbucket.org/alexweber/gizmo-express/commit/bafb7d7))
* fully test controllers + other test tweaks, all passing ([0b838b7](https://bitbucket.org/alexweber/gizmo-express/commit/0b838b7))
* implement auth middleware ([305977d](https://bitbucket.org/alexweber/gizmo-express/commit/305977d))
* implement crud router, implement roles and users ([913e0e6](https://bitbucket.org/alexweber/gizmo-express/commit/913e0e6))
* implement initial tests for index route ([2caf341](https://bitbucket.org/alexweber/gizmo-express/commit/2caf341))
* init db bootstrap ([8b59ef7](https://bitbucket.org/alexweber/gizmo-express/commit/8b59ef7))
* init helper for search params ([a15f4fb](https://bitbucket.org/alexweber/gizmo-express/commit/a15f4fb))
* initial cache middleware implementation using apicache ([fc6de5d](https://bitbucket.org/alexweber/gizmo-express/commit/fc6de5d))
* initial model implementation using typescript ([b16c3bf](https://bitbucket.org/alexweber/gizmo-express/commit/b16c3bf))
* initial role and user controller crud implementation ([0d6059b](https://bitbucket.org/alexweber/gizmo-express/commit/0d6059b))
* initial role and user crud complete ([1facfbf](https://bitbucket.org/alexweber/gizmo-express/commit/1facfbf))
* initial role controller test with sinon ([d78a641](https://bitbucket.org/alexweber/gizmo-express/commit/d78a641))
* initial tests for main server class ([e223a25](https://bitbucket.org/alexweber/gizmo-express/commit/e223a25))
* mongoose paginate helper for crud router ([64c1b7d](https://bitbucket.org/alexweber/gizmo-express/commit/64c1b7d))
* new tests for user controller ([548b728](https://bitbucket.org/alexweber/gizmo-express/commit/548b728))
* placeholder test + package script ([1b479c8](https://bitbucket.org/alexweber/gizmo-express/commit/1b479c8))
* refactor controllers, initial generic implementation of both regular and paged searches ([5b41a8c](https://bitbucket.org/alexweber/gizmo-express/commit/5b41a8c))
* rework role controller tests to leverage mockgoose ([b5c9353](https://bitbucket.org/alexweber/gizmo-express/commit/b5c9353))
* rework router setup yet again, auto api versioning from config ([b792223](https://bitbucket.org/alexweber/gizmo-express/commit/b792223))
* set DEBUG in dev start script ([9b133a0](https://bitbucket.org/alexweber/gizmo-express/commit/9b133a0))
* update server to accomodate testing, tests green ([15da6e6](https://bitbucket.org/alexweber/gizmo-express/commit/15da6e6))
* use dev error handler when not in prod ([9f40e22](https://bitbucket.org/alexweber/gizmo-express/commit/9f40e22))
* use wrapper for cumbersome debug init ([47c183a](https://bitbucket.org/alexweber/gizmo-express/commit/47c183a))
* watch tsc and run nodemon concurrently ([166a97e](https://bitbucket.org/alexweber/gizmo-express/commit/166a97e))
* workaround for mongoose topology destroyed errors ([69809f2](https://bitbucket.org/alexweber/gizmo-express/commit/69809f2))
