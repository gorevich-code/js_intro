const User = require("./misc/user_model");
const express = require("express");
const path = require("path");
const multer = require("multer");
const upload = multer();

// Initialize an Express application
const app = express();
const PORT = 3002;

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Middleware to parse multipart/form-data
app.use(upload.array());

// Middleware for logging requests
app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.originalUrl}`);
  // Call the next middleware function
  next();
});

// Middleware for logging responses
app.use((req, res, next) => {
  // When the response is finished, log the status code, status message, and content length
  res.on("finish", () => {
    console.log(
      `Response: ${res.statusCode} ${res.statusMessage}; ${res.get("Content-Length") || 0}b sent`
    );
  });
  // Call the next middleware function
  next();
});

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Initialize an array to store users
let userCollection = [];
let latestSavedUserIdx = 0;

// Define a DEFAULT GET route for the root path
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Define a POST route for adding a user
app.post("/users", (req, res) => {
  // If the name, email, or age is not provided in the query parameters, send a 400 status
  if (!req.body.name || !req.body.email || !req.body.age) {
    res.status(400).send("Missing required fields: name, email, age");
    return;
  }
  // Create a new user with the provided name, email, and age
  let user = new User(latestSavedUserIdx++, req.body.name, req.body.email, req.body.age);
  // Add the user to the userCollection array
  userCollection.push(user);
  // Send a response with a success message
  res.send(JSON.stringify(`User ${JSON.stringify(user)} successfully added!`));
});

// Define a GET route for receiving all users list
app.get("/users/", (req, res) => {
  // Send the entire userCollection array as the response
  res.send(JSON.stringify(userCollection));
});

// Define a GET route for receiving a user by id
app.get("/users/:id", (req, res) => {
  // Initialize a variable to hold the user if found
  let userFound = null;

  // Iterate over the userCollection to find the user with the given id
  userCollection.forEach((user) => {
    if (user.id === parseInt(req.params.id)) {
      // If the user is found, store it in userFound
      userFound = user;
    }
  });

  // If the user is found, send it as the response
  if (userFound) {
    res.send(JSON.stringify(userFound));
  } else {
    // If the user is not found, send a 404 status
    res.status(404).send("User not found");
  }
});

// Define a PUT route for changing existing user data
app.put("/users/:id", (req, res) => {
  let userFound = null;

  // Iterate over the userCollection to find the user with the given id
  console.log(`req.params.id: ${req.params.id}`);
  userCollection.forEach((user) => {
    if (user.id === parseInt(req.params.id)) {
      userFound = user;
    }
  });
  console.log(`req.body: ${JSON.stringify(req.body)} req.params ${JSON.stringify(req.params)}`);
  // Check for query parameters and update the user data if found
  if (req.body.name || req.body.email || req.body.age) {
    if (userFound) {
      let userDataBefore = JSON.stringify(userFound);

      Object.keys(userFound).forEach((key) => {
        if (key !== "id" && req.body[key]) {
          userFound[key] = req.body[key];
        }
      });
      let userDataAfter = JSON.stringify(userFound);

      // Send the user data before and after modification
      res.send(
        JSON.stringify(`User data before: ${userDataBefore}, User data after: ${userDataAfter}`)
      );
    } else {
      // If the user is not found, send a 404 status
      res.status(404).send("User not found");
    }
  } else {
    // If none of the fields (name, email, age) is provided, send a 400 status
    res.status(400).send("At least one field is required: name, email, age");
  }
});

app.delete("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  // Find the index of the user with the given id
  const index = userCollection.findIndex((user) => user.id === id);

  // If the user is found
  if (index !== -1) {
    const userFound = userCollection[index];
    // Remove the user from the userCollection array
    userCollection.splice(index, 1);
    // Send the removed user as the response
    res.send(JSON.stringify(userFound));
  } else {
    // If the user is not found, send a 404 status
    res.status(404).send("User not found");
  }
});

// Start the server on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
