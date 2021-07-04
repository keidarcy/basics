const wsock = require("websocket-stream");
const stream = wsock("ws://localhost:3000");

process.stdin.pipe(stream).pipe(process.stdout);
