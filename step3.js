const fs = require("fs").promises;
const axios = require("axios");
const process = require("process");

async function cat(path) {
  try {
    const data = await fs.readFile(path, "utf8");
    return data;
  } catch (err) {
    console.error(`Error reading ${path}: ${err}`);
    process.exit(1);
  }
}

async function webCat(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.error(`Error fetching ${url}: ${err}`);
    process.exit(2);
  }
}

async function main() {
  if (process.argv[2] === "--out") {
    const outputFilename = process.argv[3];
    const source = process.argv[4];
    let tex;
    if (source.slice(0, 4) === "http") {
      tex = await webCat(source);
    } else {
      tex = await cat(source);
    }
    try {
      await fs.writeFile(outputFilename, tex, "utf8");
      console.log(`New text written to ${outputFilename}`);
    } catch (err) {
      console.error(`Couldn't write ${outputFilename}:`);
      console.error(err.message);
    }
  } else {
    const source = process.argv[2];
    if (source.slice(0, 4) === "http") {
      const data = await webCat(source);
      console.log(data);
    } else {
      const data = await cat(source);
      console.log(data);
    }
  }
}

main();
