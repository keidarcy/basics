#!/usr/bin/env node

'use strict';

import util from 'util';
import path from 'path';
import fs from 'fs';
import minimist from 'minimist';
import sqlite3 from 'sqlite3';
import http from 'http';
import staticAlias from 'node-static-alias';
import express from 'express';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
// ******************************
const HTTP_PORT = 8039;

const app = express();

const delay = util.promisify(setTimeout);

// define some SQLite3 database helpers
//  (comment out if sqlite3 not working for you)
const DB_PATH = path.join(__dirname, 'my.db');
const WEB_PATH = path.join(__dirname, 'web');
const myDB = new sqlite3.Database(DB_PATH);
const SQL3 = {
  run(...args) {
    return new Promise(function c(resolve, reject) {
      myDB.run(...args, function onResult(err) {
        if (err) {
          reject(err);
        } else {
          resolve(this);
        }
      });
    });
  },
  get: util.promisify(myDB.get.bind(myDB)),
  all: util.promisify(myDB.all.bind(myDB)),
  exec: util.promisify(myDB.exec.bind(myDB))
};

const fileServer = new staticAlias.Server(WEB_PATH, {
  cache: 100,
  serverInfo: 'Node Practice: ex5',
  alias: [
    {
      match: /^\/(?:index\/?)?(?:[?#].*$)?$/,
      serve: 'index.html',
      force: true
    },
    {
      match: /^\/js\/.+$/,
      serve: '<% absPath %>',
      force: true
    },
    {
      match: /^\/(?:[\w\d]+)(?:[\/?#].*$)?$/,
      serve: function onMatch(params) {
        return `${params.basename}.html`;
      }
    },
    {
      match: /[^]/,
      serve: '404.html'
    }
  ]
});

const httpserv = http.createServer(app);

main();

// ****************************

function main() {
  defineRoutes();
  httpserv.listen(HTTP_PORT);
  console.log(`listening on http://localhost:${HTTP_PORT}...`);
}

function defineRoutes() {
  delay(1000);
  app.get('/get-records', async function (req, res) {
    await delay(1000);
    const records = await getAllRecords();
    res.writeHead(200, {
      'Content-type': 'application/json',
      'Cache-Control': 'no-cache'
    });
    res.end(JSON.stringify(records));
  });

  app.use(
    express.static(WEB_PATH, {
      maxAge: 100,
      setHeaders: function setHeaders(res) {
        res.setHeader('Server', 'node workshop');
      }
    })
  );
}

async function getAllRecords() {
  let result = await SQL3.all(
    `
      SELECT
        Other.data as 'other',
        Something.data as 'something'
      FROM
        Something JOIN Other
        ON (Something.otherId = Other.id)
      ORDER BY
        Other.id DESC, Something.data ASC
    `
  );
  if (result && result.length > 0) {
    return result;
  }
}
