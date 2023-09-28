const { log } = require("console");
const fs = require("fs");

function cat(path) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.log(`Error reading ${path}: ${err}`);
      process.exit[1];
    }
    console.log("DATA:", data);
  });
}

cat("./text.txt");
