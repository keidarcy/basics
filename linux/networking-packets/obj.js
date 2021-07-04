const through = require('through2');

let size = 0;

// process.stdin
//   .pipe(through({ objectMode: true }, write1))
//   .pipe(through({ objectMode: true }, write2));
process.stdin.pipe(through.obj(write1)).pipe(through.obj(write2, end));

function write1(buf, enc, next) {
  next(null, { length: buf.length });
  // next(null, { length: buf.length, total: (size += buf.length) });
}

function write2(obj, enc, next) {
  size += obj.length;
  next();
}

function end() {
  console.log({ size });
}
