const Game = require("../models/game");
const Comment = require("../models/comment");

const game_seeds = [
    {
        title: "Skyrim",
        description:
            "The Elder Scrolls V: Skyrim is an action role-playing video game.",
        image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.X5hNxxB-TmyK-hYUkwOgiwHaEL%26pid%3DApi&f=1",
        developer: "Bethesda Game Studios",
        publisher: "Bethesda Softworks",
        genre: "rpg",
        date: "2011-11-11",
    },
    {
        title: "Watch Dogs",
        description:
            "Watch Dogs is an action-adventure video game franchise published",
        image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.c1p81lNtJEFXlSgdDn3TcgHaEK%26pid%3DApi&f=1",
        developer: "Ubisoft",
        publisher: "Ubisoft",
        genre: "Action",
        date: "2014-1-1",
    },
    {
        title: "Halo",
        description: "Halo: Combat Evolved is a 2001 first-person shooter. ",
        image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.H6lZldJ6h9d-EWGrMp0lbgHaEK%26pid%3DApi&f=1",
        developer: "Bungie",
        publisher: "Microsoft Game Studios",
        genre: "action",
        date: "2001-11-1",
    },
];

const seed = async () => {
    //1- delete all the current games and comment
    await Game.deleteMany();
    console.log("Deleted all the games.");
    await Comment.deleteMany();
    console.log("Deleted all the comments.");

    //2- Create three new games
    for (const game_seed of game_seeds) {
        let game = await Game.create(game_seed);
        console.log("Created game: " + game.title);
        //3- Create a new comment for each game
        await Comment.create({
            text: "I ruved this Comic Rook",
            user: "scooby_doo",
            gameId: game._id,
        });
        console.log("Created a new comment!");
    }
};

module.exports = seed;
