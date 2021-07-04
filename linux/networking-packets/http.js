const http = require("http");
const fs = require("fs");

const server = http.createServer(function (req, res) {
  if (req.method === "POST") {
    req.pipe(process.stdout);
    req.once("end", function () {
      res.end("ok|n");
    });
  } else {
    res.setHeader("content-type", "text/plain");
    fs.createReadStream("obj.js").pipe(res);
  }
});

server.listen(3000);
