const express = require("express");

const app = express();

const port = 3000;

//1. root
app.get("/", (req, res) => res.send("This is the homepage"));

//2. sports
app.get("/sports/:sportName", (req, res) => {
    switch (req.params.sportName) {
        case "soccer":
            res.send("Soccer is awesome!");
            break;
        case "basketball":
            res.send("Basketball is ok");
            break;
        case "golf":
            res.send("Golf is boring");
            break;
        default:
            res.send("Enter a valid sport");

            break;
    }
});

// 3.parrot
app.get("/parrot/:say/:number", (req, res) => {
    //repeat the sentence by the amount on the url
    res.send(`${req.params.say} `.repeat(req.params.number));
});

app.get("*", (req, res) => res.send("404, page not found"));

app.listen(port, () => console.log("App is listening on port 3000"));
