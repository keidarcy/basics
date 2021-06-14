#! /usr/bin/env node

'use strict';

import util from 'util';
import path from 'path';
import fs from 'fs';
import minimist from 'minimist';
import getStdin from 'get-stdin';
import { Transform } from 'stream';
import zlib from 'zlib';

const args = minimist(process.argv.slice(2), {
  boolean: ['help', 'in', 'compress', 'decompress'],
  string: ['file']
});

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const BASE_PATH = path.resolve(process.env.BASE_PATH || __dirname);

let OUTPUT_FILE = path.join(BASE_PATH, './files/out.txt');

const printHelp = () => {
  console.log('2.js usage:');
  console.log('  2.js --help');
  console.log('  2.js --file={FILENAME} ');
  console.log('');
  console.log('--help                             print this help');
  console.log('--file={FILENAME}                  process the file');
  console.log('--in, -                            process stdin');
  console.log('--out                              print to stdout');
  console.log('--compress                         gzip the output ');
  console.log('--decompress                       un-gzip the input ');
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

  if (args.decompress) {
    let gunzipStream = zlib.createGunzip();
    outStream = outStream.pipe(gunzipStream);
  }

  const upperStream = new Transform({
    transform(chunk, enc, next) {
      this.push(chunk.toString().toUpperCase());
      // setTimeout(next, 500);
      next();
    }
  });

  outStream = outStream.pipe(upperStream);

  if (args.compress) {
    let gzipStream = zlib.createGzip();
    outStream = outStream.pipe(gzipStream);
    OUTPUT_FILE += '.gz';
  }

  let targetStream;

  if (args.out) {
    targetStream = process.stdout;
  } else {
    targetStream = fs.createWriteStream(OUTPUT_FILE);
  }
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
