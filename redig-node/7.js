#!/usr/bin/env node

'use strict';

import util from 'util';
import childProc from 'child_process';

const HTTP_PORT = 8039;
const MAX_CHILDREN = 5;

const delay = util.promisify(setTimeout);

main().catch(console.error);

async function main() {
  console.log(`Load testing http://localhost:${HTTP_PORT}...`);

  while (true) {
    process.stdout.write(`Sending ${MAX_CHILDREN} requests...`);

    let children = [];
    for (let i = 0; i < MAX_CHILDREN; i++) {
      children.push(childProc.spawn('node', ['7-child.js']));
    }
    let resps = children.map(function wait(child) {
      return new Promise(function c(res) {
        child.on('exit', function (code) {
          if (code === 0) res(true);
          res(false);
        });
      });
    });

    resps = await Promise.all(resps);
    if (resps.filter(Boolean).length == MAX_CHILDREN) {
      console.log('success');
    } else {
      console.log('fail');
    }
    await delay(500);
  }
}
