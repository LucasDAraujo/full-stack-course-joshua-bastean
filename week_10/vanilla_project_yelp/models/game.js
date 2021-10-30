//Importing mongoose
const mongoose = require("mongoose");

//Using mongoose.schema to create the ganeSchema
const gamesSchema = new mongoose.Schema({
    title: "String",
    description: "String",
    image: "String",
});

//Compiling the game schema into a more advanced constant with CAPITAL C using  mongoose.model
const Game = mongoose.model("game", gamesSchema);

//exporting
module.exports = Game;
