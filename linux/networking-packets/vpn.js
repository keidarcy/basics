const net = require('net');
const crypto = require('crypto');
const pw = 'abc123';

net
  .createServer(function (stream) {
    stream
      .pipe(crypto.createDecipheriv('aes-256-ccm'), pw)
      .pipe(net.connect(3000, 'localhost'))
      .pipe(crypto.createCipheriv('aes-256-ccm', pw))
      .pipe(stream);
  })
  .listen(3001);
