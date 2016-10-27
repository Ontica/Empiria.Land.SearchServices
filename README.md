# Introduction

Empiria Trade is a colaborative e-commerce solution for specific markets,
that provides the following services:

* Product data management
* Sales and order management
* Supply and distribution management
* Billing and credit management


This project is based on Angular 2.0 RC-4 and TypeScript 2.0 Beta.

# How to start

**Note** this project requires node v4.x.x or higher and npm 2.14.7.

You must have `ts-node` installed as global. If you don't, use:

```bash
npm install -g ts-node
```

In order to start use:
```bash

git clone https://github.com/Ontica/Empiria.Trade.WebApp
cd Empiria.Trade.WebApp
npm install       # or `npm run reinstall` if you get an error
npm start         # start with --env dev

# dev build
npm run build.dev
# prod build
npm run build.prod
```

# Configuration

Default application server configuration

```javascript
var PORT             = 5555;
var LIVE_RELOAD_PORT = 4002;
var DOCS_PORT        = 4003;
var APP_BASE         = '/';
```

Configure at runtime

```bash
npm run start -- --port 8080 --reload-port 4000 --base /my-app/

# Running tests

```bash
npm tests
```

# Directory Structure

```
.
├── LICENSE
├── README.md
├── gulpfile.ts                <- configuration of the gulp tasks
├── karma.conf.js              <- configuration of the test runner
├── package.json               <- dependencies of the project
├── protractor.conf.js         <- e2e tests configuration
├── src                        <- source code of the application
│   ├── assets                 <- folder with general assets (e.g, css, svg and png files)
│   ├── global_shared          <- shared components, directives, services and types reusable in other projects
│   │   ├── components         <- Empiria general purpose reusabe Angular components (toolbars, login form, calendar editor, etc)
|   │   ├── directives
│   │   ├── services
│   │   └── to-npm-types       <- temporal business tier types that have to be moved to a npm package
│   ├── testing                <- end-to-end and integration tests folder
│   ├── trade                  <- Empiria Trade application
|   |   ├── app                <- main page component
|   │   ├── app_shared         <- Application shared components not reusable in other projects
|   │   │   ├── components
|   |   │   ├── directives
|   |   │   └── services
|   |   ├── billing            <- Billing components
|   |   ├── ordering           <- Ordering components
|   |   ├── pdm                <- Product Data Management components
|   |   ├── ...
|   │   └──
│   ├── empiria.config         <- Empiria Configuration file
│   ├── index.html             <- application's main page
│   └── main.ts                <- Angular and Empiria application bootstraping methods
│
├── test-main.js               <- testing configuration
├── tools
│   ├── README.md              <- build documentation
│   ├── config
│   │   ├── project.config.ts  <- configuration of the specific project
│   │   ├── seed.config....
│   │   └── seed.config.ts     <- generic configuration of the seed project
│   ├── config.ts              <- exported configuration (merge both seed.config and project.config, project.config overrides seed.config)
│   ├── debug.ts
│   ├── manual_typings
│   │   ├── project            <- manual ambient typings for the project
│   │   │   └── sample.pac...
│   │   └── seed               <- seed manual ambient typings
│   │       ├── merge-stre..
│   │       └── slash.d.ts
│   ├── tasks                  <- gulp tasks
│   │   ├── project            <- project specific gulp tasks
│   │   │   └── sample.tas...
│   │   └── seed               <- seed generic gulp tasks. They can be overriden by the project specific gulp tasks
│   ├── utils                  <- build utils
│   │   ├── project            <- project specific gulp utils
│   │   │   └── sample_util...
│   │   ├── project.utils.ts
│   │   ├── seed               <- seed specific gulp utils
│   │   │   ├── clean.ts
│   │   │   ├── code_change...
│   │   │   ├── server.ts
│   │   │   ├── tasks_tools.ts
│   │   │   ├── template_loc...
│   │   │   ├── tsproject.ts
│   │   │   └── watch.ts
│   │   └── seed.utils.ts
│   └── utils.ts
├── tsconfig.json              <- configuration of the typescript project (ts-node, which runs the tasks defined in gulpfile.ts)
├── tslint.json                <- tslint configuration
├── typings                    <- typings directory. Contains all the external typing definitions defined with typings
├── typings.json
└── appveyor.yml
```

# License

GNU AFFERO GENERAL PUBLIC LICENSE
