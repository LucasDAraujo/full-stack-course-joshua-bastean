import express from "express";
import fetch from "node-fetch";

const app = express();
const apiKey = "26c52ed6";
const port = 3000;
const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=Star+wars`;
app.set("view engine", "ejs");

//Making an api call to the open movie database
app.get("/movies", (req, res) => {
    fetch(url)
        .then((data) => data.json())
        .then((data) => {
            res.render("movies", { data });
        })
        .catch((err) => res.send(data));

        
    });
    
    console.log(url)
app.get("*", (req, res) => {
    res.send("That's a 404");
});

app.listen(port, () =>
    console.log(`MovieDB server is running on port ${port}!`)
);
