const concat = require('concat-stream');
const http = require('http');
const through = require('through2');
const qs = require('querystring');

const server = http.createServer(function (req, res) {
  req.pipe(counter()).pipe(concat({ encoding: 'string' }, onBody));
  function counter() {
    let size = 0;
    return through(function (buf, enc, next) {
      size += buf.length;
      if (size > 15) {
        // next(null, null);
        res.end('TOO BIG');
      } else next(null, buf);
    });
  }

  function onBody(body) {
    const params = qs.parse(body);
    console.log(params);
    res.end('ok \n');
  }
});

server.listen(3000);
