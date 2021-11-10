const express = require("express");
const app = express();
const port = 3000;
const config = require("./config");
const mongoose = require("mongoose");

app.set("view engine", "ejs");

mongoose.connect(config.database.connection());

//Index route
app.get("/", (req, res) => {
    res.render("index");
});

//Account route
app.get("/account", (req, res) => {
    res.render("account");
});

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
