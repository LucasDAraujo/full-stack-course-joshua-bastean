const express = require ("express");


const app = express();
const port = 3000;

//THIS IS JUST A TEST, I'LL USE DATABASE
const games = [
    {
        title: "League of Legends",
        description:
            "Coloring book next level paleo pinterest, pour-over fashion axe hell of lumbersexual marfa. Vexillologist coloring book ennui farm-to-table, pour-over artisan heirloom kogi pug hell of 8-bit aesthetic. Intelligentsia hell of echo park portland pour-over. ",
        image: "https://upload.wikimedia.org/wikipedia/en/c/ca/League_of_Legends_Screenshot_2018.png",
    },
    {
        title: "The Sims 4",
        description:
            "Coloring book next level paleo pinterest, pour-over fashion axe hell of lumbersexual marfa. Vexillologist coloring book ennui farm-to-table, pour-over artisan heirloom kogi pug hell of 8-bit aesthetic. Intelligentsia hell of echo park portland pour-over. ",
        image: "https://upload.wikimedia.org/wikipedia/en/7/7f/Sims4_Rebrand.png",
    },
    {
        title: "CSGO",
        description:
            "Coloring book next level paleo pinterest, pour-over fashion axe hell of lumbersexual marfa. Vexillologist coloring book ennui farm-to-table, pour-over artisan heirloom kogi pug hell of 8-bit aesthetic. Intelligentsia hell of echo park portland pour-over.",
        image: "https://upload.wikimedia.org/wikipedia/en/6/6e/CSGOcoverMarch2020.jpg",
    },
];

//Sets ejs
app.set("view engine", "ejs");

//Makes the public folder visible
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

//root route
app.get("/", (req, res) => res.render("landing"));

//games GET route
app.get("/games", (req, res) => {
    res.render("games", { games });
});

//games POST route
app.post("/games", (req, res) => {
    console.log(req.body)
    games.push(req.body)
    res.redirect("/games")
});

//form GET route
app.get("/games/new", (req, res) => {
    res.render("games_new");
});

//404 route
app.get("*", (req, res) => res.send("That's a 404"));

app.listen(port, () => console.log(`Yelp_games is working on port ${port}`));
