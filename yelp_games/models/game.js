//Importing mongoose
const mongoose = require("mongoose");

//Using mongoose.schema to create the ganeSchema
const gamesSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String,
    developer: String,
    publisher: String,
    genre: String,
    date: Date,
});

//Compiling the game schema into a more advanced constant with CAPITAL C using  mongoose.model
//and exporting

module.exports = mongoose.model("Game", gamesSchema);
