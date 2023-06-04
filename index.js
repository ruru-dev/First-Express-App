//importing the express dependecy
const express = require('express');

//creating the express app object
const app = express();

//dotenv is a npm package that stores environment variables
//set the port #, looks for an environment variable in a .env file. If it doesn't find one, it defaults to 4000
//process is the main node object (similar to window object in browser)
const port = process.env.PORT || 4000;

// Import a module (code) from the state.js file. It will return an object. 
// Use object deconstruction to extract the users key from that object into a variable with the same name (users)
const { users } = require('./state');

/* BEGIN - create routes here */
app.get("/users", function(req, res) {
  res.send(users);
});

app.get("/users/1", function(req, res) {
  res.send(users[0]);
});

app.post("/users", function(req, res) {
  const newUser = {
    _id: users.length + 1,
    name: "Sailor Moon",
    occupation: "Champion of Justice",
    avatar: "https://avatarfiles.alphacoders.com/102/102069.jpg"
  };
  users.push(newUser);
  res.json(users[users.length-1]);
});
// There is no actual difference between res.send and res.json, both methods are almost identical. 
// res.json calls res.send at the end. When you have an object or array which you have to pass as 
// a response then you can use any one of them.
// But the main difference between res.json and res.send comes into picture when you have to pass
//  non objects as a response. res.json will convert non objects (ex. null, undefined etc) as well
//   which are actually not a valid JSON whereas res.send will not convert them.

app.put("/users/1", function(req, res) {
  users[0].occupation = "nurse";
  res.json(users[0]);
});

app.delete("/users/1", function(req, res) {
  users.splice(0, 1);
  res.send("deleted");
  // Give your server the ability to respond to a DELETE request with a path "/users/1" 
  // and remove the first item from the users array. Use res.send() to send back a messsage, "deleted"
});

/* END - create routes here */

app.listen(4000, function() {
  console.log(`Example app listening on port ${4000}!`)
});