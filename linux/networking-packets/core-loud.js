const { Transform } = require('stream');

process.stdin
  .pipe(
    new Transform({
      transform: (buf, enc, next) => {
        next(null, buf.toString().toUpperCase());
      }
    })
  )
  .pipe(process.stdout);
