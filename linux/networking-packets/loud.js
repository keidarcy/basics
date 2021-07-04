const fs = require('fs');
const through = require('through2');

// fs.createReadStream(process.argv[2])
// 	.pipe(through(write))
// 	.pipe(process.stdout);

process.stdin.pipe(toUpper()).pipe(process.stdout);

function toUpper() {
  return through(function (buf, enc, next) {
    // next(null, buf.toString().toUpperCase());
    this.push('hello');
    this.push(buf.toString().toUpperCase());
    next();
  });
}
