const http = require('http');
const https = require('https');
const fs = require('fs');
const StringDecoder = require('string_decoder').StringDecoder;
const config = require('./config');

const httpServer = http.createServer((req, res) => {
  unifiedServer(req, res);
});

httpServer.listen(config.httpPort, () => {
  console.log(`listening on ${config.httpPort} in ${config.envName} env now`);
});

const httpsServerOptions = {
  key: fs.readFileSync('./https/key.pem', 'utf-8'),
  cert: fs.readFileSync('./https/cert.pem', 'utf-8')
};
const httpsServer = https.createServer(httpsServerOptions, (req, res) => {
  unifiedServer(req, res);
});

httpsServer.listen(config.httpsPort, () => {
  console.log(`listening on ${config.httpsPort} in ${config.envName} env now`);
});

const unifiedServer = (req, res) => {
  const parseUrl = new URL(req.url, config.base);
  const path = parseUrl.pathname.replace(/^\/+|\/+$/g, '');
  const query = parseUrl.searchParams;
  const method = req.method.toLowerCase();

  const decoder = new StringDecoder('utf-8');

  let buffer = '';
  req.on('data', (data) => {
    console.log(data);
    buffer += decoder.write(data);
  });

  req.on('end', () => {
    buffer += decoder.end();

    const chosenHandler =
      typeof router[path] !== 'undefined' ? router[path] : router.notFound;

    const data = {
      path,
      query,
      method,
      payload: buffer
    };

    chosenHandler(data, (statusCode, payload) => {
      statusCode = typeof statusCode === 'number' ? statusCode : 200;
      payload = typeof payload === 'object' ? payload : {};
      const payloadString = JSON.stringify(payload);
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(statusCode);
      res.end(payloadString);
      console.log({ statusCode, payloadString });
    });
  });
};

const handlers = {
  sample: (data, cb) => {
    cb(200, { name: 'sample handler' });
  },
  notFound: (data, cb) => {
    cb(404);
  },
  ping: (data, cb) => {
    cb(200);
  }
};

const router = {
  sample: handlers.sample,
  notFound: handlers.notFound,
  ping: handlers.ping
};
