// Setup empty JS object to act as endpoint for all routes
let projectData = {};


const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv')
dotenv.config()

app.use(cors());
app.use(express.static('dist'));
console.log(__dirname)

// Setup Server
const port = 6061;
const server = app.listen(port, () => {
    console.log(`running on localhost ${port}`);
});

//Get route
app.get('/all', (req, res) => {
    res.send(projectData);
    console.log(projectData, 'projectData posted');
});

//Post route
app.post('/add', (req, res) => {
    let geodata = req.body;
    projectData["lat"] = geodata.lat;
    projectData["lng"] = geodata.lng;
    projectData["countryName"] = geodata.countryName;
    res.send(projectData)
    console.log("geo add")

})

// app.post('/add', (req, res) => {
//     console.log(req.body)
//     let geodata = {
//         lat: req.body.lat,
//         lng: req.body.lng,
//         countryName: req.body.countryName
//     }
//     projectData.geodata = geodata;
//     console.log(geodata, 'geodata')

//     let weatherData = {
//         temp: req.body.temp,
//         description: req.body.description
//     }
//     projectData.weatherData = weatherData
//     console.log(weatherData, 'weatherdata')

//     res.send(projectData);
// });