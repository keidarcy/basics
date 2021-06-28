#!/usr/bin/env node

'use strict';

import util from 'util';
import fetch from 'node-fetch';

const HTTP_PORT = 8039;

const delay = util.promisify(setTimeout);

main().catch(console.error);

async function main() {
  try {
    const res = await fetch('http://localhost:8039/get-records');
    if (res && res.ok) {
      const records = await res.json();
      console.log('re');
      if (records && records.length > 0) {
        process.exitCode = 0;
        return;
      }
    }
  } catch (error) {
    console.error(error);
  }
  process.exitCode = 1;
}
