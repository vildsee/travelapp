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
document.getElementById('date').innerHTML = today;

//Global variables
const countHTML = document.getElementById('countdown')
//Eventlistener for id=generate
document.querySelector('#submitTrip').addEventListener('click', performAction);


//Event
function performAction(event) {
    event.preventDefault();
    const city = document.getElementById('inputLocation').value;

    getCoordinates(geoBaseUrl, city, username)
    .then(async (geodata) => {
        const res = await
        postData('/all', {
            city: city,
            lat: geodata.geonames[0].lat,
            lng: geodata.geonames[0].lng,
            name: geodata.geonames[0].name,
            countryName: geodata.geonames[0].countryName

        })
        
        const lat = geodata.geonames[0].lat;
        const lng = geodata.geonames[0].lng;
        
        getWeather(weatherBaseUrl, lat, lng, weatherKey)
        .then(async (weatherData) => {
            const res = await
            postData('/all', {
                temp: weatherData.data[0].temp,
            })
        })
            getPics(pixabayBaseUrl, pixabayKey, city)
            .then(async (picData) => {
                
                const res = await                
                postData('/all', {
                    webformatURL: picData.hits[0].webformatURL,
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
        const pic = projectData.webformatURL;
        console.log(projectData.webformatURL);

        document.getElementById('destination').innerHTML = `${projectData.name}, ${projectData.countryName}`;
        document.getElementById('cityImage').innerHTML = `<img src="${pic}" alt="img not found" width="200px"/>`;
        document.getElementById('duration').innerHTML = `${startDate.toDateString()}-${endDate.toDateString()}`;
        document.getElementById('weather').innerHTML = `Temperature: ${projectData.temp}°C`;
        document.getElementById('countryData').innerHTML = ``;
    } catch(error){
        console.log('error UI', error);
    }
};

//Countdown
countdown = () => {
    
    const day = new Date().getTime()
    const startDate = new Date(document.getElementById('start').value)

    var count = startDate - day
    var days = Math.floor(count / (1000 * 60 * 60 * 24));
    
    if(days >= 1){
        countHTML.innerHTML = `Your trip is in ${days + 1} days`
    } else if(days === 0){
        countHTML.innerHTML = 'Your trip is tomorrow!'
    } else if(days === -1){
        countHTML.innerHTML = 'Your trip is today!'
    }
    
};

tripLength = () =>{
    const lengthHTML = document.getElementById('length')
    const startDate = new Date(document.getElementById('start').value)
    const endDate = new Date(document.getElementById('end').value)

    var daysDifference = endDate - startDate
    var lengthDays = Math.floor(daysDifference / (1000 * 60 * 60 * 24));

    if (lengthDays >= 2) {
        lengthHTML.innerHTML = `Your trip will be ${lengthDays} days long`
    } else if (lengthDays === 1) {
        lengthHTML.innerHTML = `Your trip will be ${lengthDays} day long`
    }
}