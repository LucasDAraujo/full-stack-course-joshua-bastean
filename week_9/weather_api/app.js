import fetch from "node-fetch";

const apiKey = "def2aac8c9e9b6af43ba35f06cd29bdd";

// const url = `https://api.openweathermap.org/data/2.5/weather?lat=-9.9&lon=-67.8&appid=${apiKey}`;

const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=-9.9&lon=-67.8&units=metric&appid=${apiKey}`;

// fetch(url)
//     .then((res) => res.json())
//     .then((res) => console.log(res))
//     .catch((err) => {
//         console.log(err);
//     });

fetch(urlForecast)
    .then((res) => res.json())
    .then((res) => {
        for (let i = 0; i < res.list.length; i += 8) {
            let data = res.list[i].dt_txt.split(" ");
            data[1] = parseInt(data[1]) - 5;
            console.log(
                `Temperatura de Rio Branco no dia: ${data[0]} as ${data[1]}:00  ${res.list[i].main.temp}`
            );
        }
    });
