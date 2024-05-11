const fs = require("fs");

const readFilePromise = (path) =>
  new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) reject(err);
      else {
        console.log("Data has been red");
        resolve(data);
      }
    });
  });

readFilePromise("data.json")
  .catch((err) => console.error("Read file error", err))
  .then((data) => {
    parsed_data = JSON.parse(data);
    console.log(parsed_data);
    parsed_data.users[0].name = "John Wick";
    parsed_data.email = "john.wick@example.com";
    return parsed_data;
  })
  .then((data) =>
    new Promise((resolve, reject) => {
      fs.writeFile("final_data.json", JSON.stringify(data), (err) => {
        if (err) reject(err);
        else {
          console.log("Data has been written");
          resolve();
        }
      });
    }).catch((err) => {
      console.log(err);
      throw err;
    })
  );
