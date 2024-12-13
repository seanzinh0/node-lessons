const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require("./utils/weatherstack");
const geocode = require("./utils/geocode");

const app = express();

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handlebars engine and views location
app.set("views", viewsPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: "Neil DeGrasse Tyson"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name: "Neil DeGrasse Tyson"
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        name: "Neil DeGrasse Tyson",
        message: "Do you need help?"
    });
})

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    }

    const units = req.query.units || "f";
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error});
        }

        forecast(latitude, longitude, units, (error, forecastData) => {
            if (error) {
                return res.send({error});
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        });
    });
})

app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get("/help/*", (req, res) => {
    res.render('404', {
        title: "404",
        message: "Help article not found",
        name: "Neil DeGrasse Tyson"
    })
})

app.get("*", (req, res) => {
    res.render('404', {
        title: "404",
        name: "Neil DeGrasse Tyson",
        message: "Page not found"
    })
})

// app.com
// app.com/help
// app.com/about

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});