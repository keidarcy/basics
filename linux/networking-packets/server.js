const http = require('http');
const parseForm = require('body');

const server = http.createServer((req, res) => {
  console.log({ method: req.method, url: req.url, headers: req.headers });

  parseForm(req, res, (err, params) => {
    console.log(JSON.stringify(params));
    res.end('ok \n');
  });
});

server.listen(3000);
