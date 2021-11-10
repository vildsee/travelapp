// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
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
    console.log('app get');
});

//Post route
app.post('/all', (req, res) => {
    console.log(req.body)
    let newEntry = {
        lat: req.body.lat,
        lng: req.body.lng,
        countryName: req.body.countryName
    }
    projectData=newEntry;
    res.send(projectData)
});