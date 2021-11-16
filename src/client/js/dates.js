// Create a new date instance dynamically with JS
let day = new Date();
let today = day.getDate() + '.' + (day.getMonth() +1) + '.' + day.getUTCFullYear();
document.getElementById('date').innerHTML = today;

