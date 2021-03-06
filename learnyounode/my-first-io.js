const fs = require("fs");

const file = process.argv[2];

const count = fs.readFileSync(file, "utf8").toString().split("\n").length - 1;

console.log(count);
