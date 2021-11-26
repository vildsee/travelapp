document.getElementById('addTripBtn').addEventListener('click', saveTrip())

function saveTrip(event)  {
    // event.preventDefault();
    const displayData = document.getElementById('displayData')
    const oldTrips = document.getElementById('oldTrips')
    oldTrips.innerHTML = displayData.value
}
