const { rejects } = require("assert");
const fs = require("fs");
const { nextTick } = require("process");

const readFilePromise = (path) =>
  new Promise((resolve, rejects) => {
    fs.readFile(path, (err, data) => {
      if (err) rejects(err);
      else {
        console.log("Data received");
        resolve(data);
      }
    });
  });

async function getFileData(path) {
  let parsedData = null;
  try {
    let data = await readFilePromise(path);
    parsedData = JSON.parse(data);
  } catch (error) {
    console.error(`Error ${error}`);
  }
  console.log(parsedData);
}

async function getNetworkData(http_address) {
  let receivedData = await fetch(http_address);
  let page_text = await receivedData.text();
  console.log(page_text);
}

getNetworkData("https://developer.mozilla.org/en-US/docs/Web/API/fetch");
getFileData("data.json");
