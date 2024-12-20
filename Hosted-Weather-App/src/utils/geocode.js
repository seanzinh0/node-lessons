const request = require('request');
//geocode async function using the geocode api takes in address and callback as parameters
//if everything is good it will return a callback with an object of the lat, long, and location
//uses request to perform https request
const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1Ijoic3BpY2hheSIsImEiOiJjbTRnMzNkNWYxZmR0Mm1xMXpqemU3a2Z6In0.rawaDMFQ6299Fi5VhNEl0g&limit=1"

    request({url, json: true}, (err, {body}) => {
        if (err){
            callback("Unable to connect to location services!", undefined);
        } else if (body.features.length === 0) {
            callback("No location found!", undefined);
        } else {
            callback(undefined, {
                latitude : body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    })
}


module.exports = geocode