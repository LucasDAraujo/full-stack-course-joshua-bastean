const casual = require("casual");
let people = [];

for (let i = 0; i < 20; i++) {
    people.push(casual.full_name);
}
console.log(people);
