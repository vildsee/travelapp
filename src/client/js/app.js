
/* GeoNames API Variables */
const geoBaseUrl = 'http://api.geonames.org/searchJSON?q=';
const username = '&username=vildsee';

/* Weatherbit API Variables */
const weatherBaseUrl = 'https://api.weatherbit.io/v2.0/forecast/daily?';
const weatherKey = `&key=${process.env.WEATHERBIT_API_KEY}`;

/* Pixabay API Variables */
const pixabayBaseUrl = 'https://pixabay.com/api/';
const pixabayKey = `?key=${process.env.PIXABAY_API_KEY}`;

// Create a new date instance dynamically with JS
let day = new Date();
let today = day.getDate() + '.' + (day.getMonth() +1) + '.' + day.getUTCFullYear();
let forecastDate = new Date(day.setDate(day.getDate() + 15));
document.getElementById('date').innerHTML = today;

//Global variables
const wHeader = document.getElementById('wHeader')
const icon = document.getElementById('weatherIcon')
const forecast = document.getElementById('forecast')

//Eventlistener for id=generate
document.querySelector('#submitTrip').addEventListener('click', performAction);


//Event
function performAction(event) {
    event.preventDefault();
    const city = document.getElementById('inputLocation').value;
    const day = new Date().getTime()
    const startDate = new Date(document.getElementById('start').value)

    count = startDate - day
    console.log(count)

    getCoordinates(geoBaseUrl, city, username)
    .then(async (geodata) => {

        const lat = geodata.geonames[0].lat;
        const lng = geodata.geonames[0].lng;
        const res = await

        getWeather(weatherBaseUrl, lat, lng, weatherKey)
        .then(async (weatherData) => {
            const res = await

            getPics(pixabayBaseUrl, pixabayKey, city)
            .then(async (picData) => {
            const res = await                
            
            postData('/all', {
                city: city,
                lat: geodata.geonames[0].lat,
                lng: geodata.geonames[0].lng,
                name: geodata.geonames[0].name,
                countryName: geodata.geonames[0].countryName,
                citypic: picData.hits[0].webformatURL,

                temp: weatherData.data[0].temp,
                todayWind: weatherData.data[0].wind_spd,
                todayIcon: weatherData.data[0].weather.icon,
                description: weatherData.data[0].weather.description,
                week_min_temp: weatherData.data[wCountdown()].min_temp,
                week_max_temp: weatherData.data[wCountdown()].max_temp,
                weekWind: weatherData.data[wCountdown()].wind_spd,
                weekIcon: weatherData.data[wCountdown()].weather.icon,
                fut_min_temp: weatherData.data[15].min_temp,
                fut_max_temp: weatherData.data[15].max_temp,
                futWind: weatherData.data[15].wind_spd,
                futIcon: weatherData.data[15].weather.icon,
                                
                })
            })
        })                
        
        countdown()
        tripLength()
    })
    
    .then(() => updateUI());
}



//Async POST
const postData = async (url='', data={}) => {
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

// Async GET
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

//Request to Weatherbit
const getWeather = async (weatherBaseUrl, lat, lng, weatherKey) => {
    const res = await fetch(weatherBaseUrl + '&lat=' + lat + '&lon=' + lng + weatherKey)
    console.log('url', res)
    try {
        const weatherData = await res.json();
        console.log(weatherData)
        return weatherData;
    } catch(error) {
        console.log('error req to weatherbit', error)
    }
}

//Request to Pixabay
const getPics = async (pixabayBaseUrl, pixabayKey, city) => {
    const res = await fetch(pixabayBaseUrl + pixabayKey + '&q=' + city + '&image_type=photo')
    console.log('url', res)
    try {
        const picData = await res.json();
        console.log(picData);
        console.log(picData.hits[0].webformatURL)
        return picData;
    } catch(error) {
        console.log('error req to pixabay', error)
    }
}

//Update UI
const updateUI = async () => {
    const req = await fetch('http://localhost:6061/all');
    try {
        const projectData = await req.json();
        // const displayData = document.getElementsByClassName('displayData')
        const pic = projectData.citypic;

        countdownConditions()

        document.getElementById('destination').innerHTML = `${projectData.name}, ${projectData.countryName}`;
        document.getElementById('cityImage').innerHTML = `<img src="${pic}" alt="img not found" width="200px"/>`;
        document.getElementById('duration').innerHTML = `${startDate.toDateString()}-${endDate.toDateString()}`;
        document.getElementById('countryData').innerHTML = ``;

        if (countdown() <= 6){
                wHeader.innerHTML = `Weather now:`;
                icon.innerHTML = `<img src="https://www.weatherbit.io/static/img/icons/${projectData.todayIcon}.png" alt="weather icon"/>`;
                forecast.innerHTML= `${projectData.description} ${projectData.temp}°C, wind speed is ${projectData.todayWind}m/s`;

            } 
            else if (countdown() <= 15){
                wHeader.innerHTML = `Weather on ${startDate.toDateString()}:`;
                icon.innerHTML = `<img src="https://www.weatherbit.io/static/img/icons/${projectData.weekIcon}.png" alt="weather icon"/>`;
                forecast.innerHTML = `Temperature will be between ${projectData.week_min_temp}°C and ${projectData.week_max_temp}°C, wind ${projectData.weekWind}m/s`;
            } 
            else {
                wHeader.innerHTML = `Weather on ${forecastDate.toDateString()}`;
                icon.innerHTML = `<img src="https://www.weatherbit.io/static/img/icons/${projectData.futIcon}.png" alt="weather icon"/>`;
                forecast.innerHTML = `Temperature will be between ${projectData.fut_min_temp}°C and ${projectData.fut_max_temp}°C, wind ${projectData.futWind}m/s`;
            }
        
            
    } catch(error){
        console.log('error UI', error);
    }
};

