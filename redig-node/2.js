#! /usr/bin/env node

'use strict';

import util from 'util';
import path from 'path';
import fs from 'fs';
import minimist from 'minimist';
import getStdin from 'get-stdin';
import { Transform } from 'stream';

const args = minimist(process.argv.slice(2), {
  boolean: ['help', 'in'],
  string: ['file']
});

const dirname = path.dirname(new URL(import.meta.url).pathname);

const BASE_PATH = path.resolve(process.env.BASE_PATH || dirname);

const printHelp = () => {
  console.log('1.js usage:');
  console.log('  1.js --help');
  console.log('  1.js --file={FILENAME} ');
  console.log('');
  console.log('--help                             print this help');
  console.log('--file={FILENAME}                  process the file');
  console.log('--in, -                  process stdin');
  console.log('');
};

const error = (msg, includeHelp = false) => {
  console.error(msg);
  if (includeHelp) {
    console.log('');
    printHelp();
  }
};

const processFile = (inStream) => {
  let outStream = inStream;
  const upperStream = new Transform({
    transform(chunk, encoding, cb) {
      this.push(chunk.toString().toUpperCase());
      setTimeout(cb, 500);
    }
  });

  outStream = outStream.pipe(upperStream);

  const targetStream = process.stdout;
  outStream.pipe(targetStream);
};

// printHelp();

if (args.help) {
  printHelp();
} else if (args.in || args._.includes('-')) {
  processFile(process.stdin);
} else if (args.file) {
  let stream = fs.createReadStream(path.join(BASE_PATH, args.file));
  processFile(stream);
} else {
  error('Incorrect usage.', true);
}
