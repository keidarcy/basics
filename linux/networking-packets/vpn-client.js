const net = require('net');
const crypto = require('crypto');
const pw = 'abc123';

const stream = net.connect(3001, 'localhost');

process.stdin
  .pipe(crypto.createCipheriv('aes-256-ccm', pw))
  .pipe(stream)
  .pipe(crypto.createDecipheriv('aes-256-ccm'), pw)
  .pipe(process.stdout);
