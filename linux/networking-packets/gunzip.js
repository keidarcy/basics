const zlib = require("zlib");
const crypto = require("crypto");

process.stdin
  .pipe(zlib.createGunzip())
  .pipe(crypto.createHash("sha512", { encoding: "hex" }))
  .pipe(process.stdout);
