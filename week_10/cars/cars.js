//Add a new car to the DB
//Get all cars from database

const config = require("../config");
const mongoose = require("mongoose");

mongoose.connect(config.database.connection());

const carSchema = new mongoose.Schema({
    make: String,
    model: String,
    year: Number,
    color: String,
    mileage: Number,
    needsRepair: Boolean,
});

//Compiles the schema on the model
const Car = mongoose.model("Car", carSchema);

const myTruck = new Car({
    make: "Fiat",
    model: "Uno",
    year: "2020",
    color: "Black",
    mileage: 40000,
    needsRepair: false,
});

//ANCHOR BEST WAY!!!
//Using promises
// Car.create(myTruck).then((err, car) =>
//     err ? console.log(err) : console.log(car)
// )

// Another way of saving
// Car.create(myTruck, (err, car) => (err ? console.log(err) : console.log(car)));

// worst way
// myTruck.save((err, car) => (err ? console.log(err) : console.log(car)));

//retrieving data
// .exec() executes our query, returning a promise
Car.findById('617cb27d6dacfedde34057d4')
    .exec()
    .then((foundCars) => console.log(foundCars))
    .catch((err) => console.log(`Error! ${err}`));
