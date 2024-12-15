const request = require('request');

/**
 *forecast async function
 * using https request checks if there is errors if not
 * uses callback to display current weather
 */
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

