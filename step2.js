const { log } = require("console");
const fs = require("fs");
const axios = require("axios");
const process = require("process");

function cat(path) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.log(`Error reading ${path}: ${err}`);
      process.exit[1];
    }
    console.log("DATA:", data);
  });
}

async function webCat(url) {
  try {
    let res = await axios.get(url);
    console.log(res.data);
  } catch (err) {
    console.log(`error fetchin ${url}:${err}`);
    process.exit[2];
  }
}

let route = process.argv[2];

if (route.slice(0, 4) === "http") {
  webCat(route);
} else {
  cat(route);
}
