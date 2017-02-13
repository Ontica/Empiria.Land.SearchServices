# Introduction

Empiria Land Search Services is an e-government portal used to search real estate,
documents, certificates and other information, concerning with a Recorder of Lands office.

This project is based on Angular and TypeScript.

# How to start

**Note** this project requires node v4.x.x or higher and npm 2.14.7.

You must have `ts-node` installed as global. If you don't, use:

```bash
npm install -g ts-node
```

In order to start use:
```bash

git clone https://github.com/Ontica/Empiria.Land.SearchServices
cd Empiria.Land.SearchServices

# install the project's dependencies
$ npm install

# watches your files and uses livereload by default
npm start

# dev build
npm run build.dev
# prod build
npm run build.prod
```

# How to start with AoT compilation

**Note** that AoT compilation requires **node v6.5.0 or higher** and **npm 3.10.3 or higher**.

In order to start the seed with AoT use:

```bash
# prod build with AoT compilation
$ npm run build.prod.exp
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

# License

GNU AFFERO GENERAL PUBLIC LICENSE

#
Copyright (C) 2016-2017. La Vía Óntica SC, Ontica LLC and contributors.
