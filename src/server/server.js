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
    let data = req.body;
    projectData["lat"] = data.lat;
    projectData["lng"] = data.lng;
    projectData["countryName"] = data.countryName;
    // projectData["startDate"] = data.startDate;
    // projectData["endDate"] = data.endDate;
    projectData["name"] = data.name;
    projectData["citypic"] = data.citypic;

    projectData["temp"] = data.temp;
    projectData["todayWind"] = data.todayWind;
    
    projectData["todayIcon"] = data.todayIcon;
    projectData["description"] = data.description;

    projectData["week_min_temp"] = data.week_min_temp;
    projectData["week_max_temp"] = data.week_max_temp;
    projectData["weekWind"] = data.weekWind;
    projectData["weekIcon"] = data.weekIcon;

    projectData["fut_min_temp"] = data.fut_min_temp;
    projectData["fut_max_temp"] = data.fut_max_temp;
    projectData["futWind"] = data.futWind;    
    projectData["futIcon"] = data.futIcon;
    res.send(projectData)
    console.log("geo add")

})

//Get route
app.get('/all', (req, res) => {
    res.send(projectData);
    console.log(projectData, 'projectData posted');
});
