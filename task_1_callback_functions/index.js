const { rejects } = require("assert");
const fs = require("fs");
const { resolve } = require("path");

fs.readFile("data.json", (err, json_data) => {
  if (err) throw err;

  parsed_data = JSON.parse(json_data.toString());
  console.log(parsed_data);
  parsed_data.users[0].name = "John Wick";
  parsed_data.users[0].email = "john.wick@example.com";

  fs.writeFile("modified_data.json", JSON.stringify(parsed_data), (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });
});
