//Countdown
function countdown() {
    
    const day = new Date().getTime()
    const startDate = new Date(document.getElementById('start').value)

    count = startDate - day
    var days = Math.floor(count / (1000 * 60 * 60 * 24));
    
    return days
};

//Countdown conditions
function countdownConditions () {
    const countHTML = document.getElementById('countdown')

    if(countdown() >= 1){
        countHTML.innerHTML = `Your trip is in ${countdown() + 1} days`
    } else if(countdown() === 0){
        countHTML.innerHTML = 'Your trip is tomorrow!'
    } else if(countdown() === -1){
        countHTML.innerHTML = 'Your trip is today!'
    }
}

//Countdown for weatherbit
function wCountdown (){
    if(countdown() <= 15){
        return countdown() + 1
    } else {
        return 15
    }
}

//Calculates trip length
function tripLength () {
    const lengthHTML = document.getElementById('length')
    const startDate = new Date(document.getElementById('start').value)
    const endDate = new Date(document.getElementById('end').value)

    var daysDifference = endDate - startDate
    var lengthDays = Math.floor(daysDifference / (1000 * 60 * 60 * 24));

    if (lengthDays >= 1) {
        lengthHTML.innerHTML = `Your trip will be ${lengthDays +1} days long<hr>`
    } else if (lengthDays === 0) {
        lengthHTML.innerHTML = `Your trip will be ${lengthDays +1} day long<hr>`
    }
}

