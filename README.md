# Introduction

Empiria Land Search Services is an e-government portal used to search documents and information,
concerning with the Recorder of Lands office.

This project is based on Angular 2.0 and TypeScript 2.0.

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


# License

GNU AFFERO GENERAL PUBLIC LICENSE
