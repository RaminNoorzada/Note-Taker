// Dependencies/ Node modules 
const express = require("express"); // Returns the function reference
const fs = require("fs");
const path = require("path") // Utilities fo the files directory path

// Initilize the app/express and create a port number
const app = express()
const PORT = process.env.PORT || 3000;

// Set up body parsing, static, and route middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Statics for assests 

// Routs files 
require('./routes/routes')(app)


// Start the server on the port
app.listen(PORT, function () {
    console.log(`App at listening at http://localhost:${PORT}`)});
    