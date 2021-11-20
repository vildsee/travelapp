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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Setup Server
const port = 6061;
const server = app.listen(port, () => {
    console.log(`running on localhost ${port}`);
});


//Post route
app.post('/add', (req, res) => {
    console.log(req.body);
    let geodata = req.body;
    projectData["lat"] = geodata.lat;
    projectData["lng"] = geodata.lng;
    projectData["countryName"] = geodata.countryName;
    projectData["startDate"] = geodata.startDate;
    projectData["endDate"] = geodata.endDate;
    projectData["name"] = geodata.name;
    projectData["temp"] = geodata.temp;
    projectData["webformatURL"] = geodata.webformatURL;
    res.send(projectData)
    console.log("geo add")

})

//Get route
app.get('/all', (req, res) => {
    res.send(projectData);
    console.log(projectData, 'projectData posted');
});
