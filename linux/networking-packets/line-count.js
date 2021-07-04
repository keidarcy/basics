const split = require("split2");
const through = require("through2");
let lineCount = 0;

process.stdin.pipe(split()).pipe(through(write, end)).pipe(process.stdout);

function write(buf, enc, next) {
  lineCount++;
  console.log(buf);
  console.log(buf.toString());
  next();
}

function end(next) {
  console.log(lineCount);
  next();
}
