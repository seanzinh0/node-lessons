const request = require('request');

// const url = "https://api.weatherstack.com/current?access_key=06f7bd354ffd9b8e3120b609c43b57f9&query=37.8267,-122.4233&units=f"

// request({url: url, json: true}, (error, response) => {
//     if (error) {
//         console.log("Unable to connect to weather service!");
//     } else if (response.body.error) {
//         console.log("Unable to find location");
//     }
//     else {
//         console.log(response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + " degrees. It feels like " + response.body.current.feelslike + " degrees.");
//     }
// })

//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast = (latitude, longitude, units ="f", callback) => {
    const url = "https://api.weatherstack.com/current?access_key=06f7bd354ffd9b8e3120b609c43b57f9&query=" + encodeURIComponent(latitude) + "," + encodeURIComponent(longitude) + "&units=" + units;
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback("Unable to connect to weather services!", undefined)
        } else if (body.error) {
            callback("Unable to find location", undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degrees. It feels like " + body.current.feelslike + " degrees.")
        }
    })
}

module.exports = forecast

