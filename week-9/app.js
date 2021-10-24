const express = require("express"); //imports express from the package
const app = express(); //Sets up a new constant  called app, which is the result os calling express as a function

//Create routes

// root route
//You can write the arguments like that(request,response), but, it's quicker using req and res
app.get("/", (req, res) => {
    res.send("I AM ROOT");
});

// /login route

app.get("/login", (req, res) => {
    res.send("Login page here");
});

// /sign route
app.get("/sing", (req, res) => {
    res.send("We're no strangers to love...");
});

//Telling the app to listen for requests
app.listen(3000, () => console.log("App is running")); //Use the port 3000, it's the most common
