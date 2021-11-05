/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const metric = '&units=metric';
const apiKey = '&appid=766858b1c912d1cf5ec5fc306bb7427d';

// Create a new date instance dynamically with JS
let day = new Date();
let newDate = (day.getMonth() + 1) +'/'+ day.getDate()+'/'+ day.getFullYear();

//Eventlistener for id=generate
document.querySelector('#generate').addEventListener('click', performAction);

//Event
function performAction(e) {
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings');
    getWeather(baseURL, zip, apiKey)
    .then((data) => {
        postData('/all', {
            temp: data.main.temp,
            feelings: feelings.value,
            date: newDate
        })
    })
    .then(() => getData('/all'))
    .then(() => updateUI());
}

//Request to OpenWeatherMap API
const getWeather = async(baseURL, zip, apiKey) => {
    const res = await fetch(baseURL+zip+metric+apiKey)
    try {
        const data = await res.json();
        console.log(data);
        return data;
    } catch(error) {
        console.log('error getweather');
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