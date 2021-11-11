/* Global Variables */
const baseURL = 'http://api.geonames.org/search?q=';
const username = 'vildsee';

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
    getCoordinates(baseURL, city, username)
    .then((data) => {
        postData('/all', {
            lat: res.data.geonames[0].lat,
            lng: res.data.geonames[0].lng,
            countryName: res.data.geonames[0].countryName
        })
    })
    .then(() => getData('/all'))
    .then(() => updateUI());
}

//Request to OpenWeatherMap API
const getCoordinates = async(baseURL, city, username) => {
    const res = await fetch(baseURL+city+'&maxRows=1&username='+username)
    try {
        const data = await res.json();
        console.log(data);
        return data;
    } catch(error) {
        console.log('error getCoordinates');
    }
};

//Async POST
const postData = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await res.json();
        return newData;
    }  catch(error) {
        console.log('error async post', error);
    }
};

//Async GET
const getData = async (url='') => {
    const req = await fetch(url);
    try {
        let allData = await req.json()
        console.log(allData);
        return allData;
    } catch(error) {
        console.log('error async get', error);
    }
};

//Update UI
const updateUI = async () => {
    const req = await fetch('/all');
    try {
        const allData = await req.json();
        
        document.getElementById('date').innerHTML = `Date: ${newDate}`;
        document.getElementById('temp').innerHTML = `Temperature: ${allData.temp}°C`;
        document.getElementById('content').innerHTML = `Feeling: ${feelings.value}`;
    }catch(error){
        console.log('error UI', error);
    }
};