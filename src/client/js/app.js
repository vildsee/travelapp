

/* GeoNames API Variables */
const geoBaseUrl = 'http://api.geonames.org/searchJSON?q=';
const username = '&username=vildsee';

/* Weatherbit API Variables */
const weatherBaseUrl = 'https://api.weatherbit.io/v2.0/forecast/daily';
const weatherKey = `&key=${process.env.WEATHERBIT_API_KEY}`;

/* Pixabay API Variables */


// Create a new date instance dynamically with JS
let day = new Date();
let newDate = day.getDate() + '.' + (day.getMonth() +1) + '.' + day.getUTCFullYear();
document.getElementById('date').innerHTML = newDate;

//Eventlistener for id=generate
document.querySelector('#submitTrip').addEventListener('click', performAction);

//Event
function performAction(event) {
    event.preventDefault();
    const city = document.getElementById('inputLocation').value;
    getCoordinates(geoBaseUrl, city, username)
    .then(async (geodata) => {
        const res = await
        postData('http://localhost:6061/add', {
            city: city,
            lat: geodata.geonames[0].lat,
            lng: geodata.geonames[0].lng,
            countryName: geodata.geonames[0].countryName

        })
        getWeather(geodata.lat, geodata.lng)
            .then(async (weatherData) => {
                const res = await
                postData('http://localhost:6061/add', {
                    temp: weatherData.data.temp,
                    description: weatherData.description  
                })
            })
    })
    
    
        
    
    .then(() => updateUI());
}

//Request to GeoNames API
const getCoordinates = async(geoBaseUrl, city, username) => {
    const res = await fetch(geoBaseUrl+city+'&maxRows=1'+username)
    console.log('url', res)
    try {
        const geodata = await res.json();
        console.log(geodata.geonames[0])
        console.log(`Lat: ${geodata.geonames[0].lat}`)
        console.log(`Lng: ${geodata.geonames[0].lng}`)
        console.log(`CountryName: ${geodata.geonames[0].countryName}`)
        return geodata
    } catch(error) {
        console.log('error getCoordinates');
    }
};

//Async POST
const postData = async (url='', data = {}) => {
    const res = await fetch('http://localhost:6061/add', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        console.log(res, 'res')
        console.log(res.body, 'res body')
    try {
        const newData = await res.json();
        return newData;
    }  catch(error) {
        console.log('error async post', error);
    }
};

//Async GET
const getData = async () => {
    const req = await fetch('http://localhost:6061/add');
    try {
        let geodata = await req.json()
        console.log(geodata);
        return geodata;
    } catch(error) {
        console.log('error async get', error);
    }
};

//Request to Weatherbit
const getWeather = async (weatherBaseUrl, lat, lng, weatherKey) => {
    const res = await fetch(weatherBaseUrl + '&lat=' + lat + '&lon=' + lng + weatherKey)
    console.log('url', res)
    try {
        const weatherData = await res.json();
        console.log(weatherData)
        return {
            temp: weatherData.data[0].temp,
            description: weatherData.data[0].weather.description
        }
    } catch(error) {
        console.log('error req to weatherbit', error)
    }
}

//Update UI
const updateUI = async () => {
    const req = await fetch('http://localhost:6061/add');
    try {
        const allData = await req.json();

        document.getElementById('destination').innerHTML = `${performAction.city}, ${projectData.geodata.countryName}`;
        document.getElementById('weather').innerHTML = `Temperature: ${projectData.weatherData.temp}`;
        document.getElementById('countryData').innerHTML = ``;
    }catch(error){
        console.log('error UI', error);
    }
};