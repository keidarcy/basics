const net = require('net');

net
  .createServer(function (stream) {
    console.log('this is proxy');
    stream.pipe(net.connect(3000, 'localhost')).pipe(stream);
  })
  .listen(3001);
