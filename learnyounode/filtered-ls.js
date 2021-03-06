const fs = require("fs");
const path = require("path");
const dir = process.argv[2];
const ext = process.argv[3];

const reg = new RegExp(`\.${ext}$`, "g");

fs.readdir(dir, (err, data) => {
  if (err) console.log(err);
  data.forEach(function (f) {
    if (path.extname(f) === "." + ext) {
      console.log(f);
    }
  });
});
