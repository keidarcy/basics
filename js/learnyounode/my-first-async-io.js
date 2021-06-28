const fs = require("fs");

const file = process.argv[2];

fs.readFile(file, "utf8", (err, data) => {
  if (err) {
    console.error(err);
  }
  const line = data.split("\n");
  // data.toString.split('\n').length -1
  console.log(line.length - 1);
});
