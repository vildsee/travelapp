//Event for hotel info

//Global variable
const hotelInfoHTML = document.getElementById('hotelInfo')
const hotelDataHTML = document.getElementById('hotelData')

//Event listener
document.getElementById('hotelBtn').addEventListener('click', hotelInfo)


//Event for add hotel form
function hotelInfo(event) {
    event.prefentDefault()

    const hForm = hotelInfoHTML.createElement('form')
    const hNameLabel = hForm.createElement('label')
    const hNameInput = hForm.createElement('input')
    const hAddressLabel = hForm.createElement('label')
    const hAddressInput = hForm.createElement('input')
    const hCheckInLabel = hForm.createElement('label')
    const hCheckInDate =  hForm.createElement('input')
    const hCheckInTime = hForm.createElement('input')
    const hCheckOutLabel = hForm.createElement('label')
    const hCheckOutDate = hForm.createElement('input')
    const hCheckOutTime = hForm.createElement('input')
    const hExtraInfo = hForm.createElement('input')
    const hSubmit = hForm.createElement('button')

    hForm.setAttribute('id', 'hForm')
    hNameLabel.setAttribute('for', 'hName')
    hAddressLabel.setAttribute('for', 'hAddress')
    hCheckInLabel.setAttribute('for', 'checkIn')
    hCheckOutLabel.setAttribute('for', 'checkOut')

    objectAssign(hNameInput, {
        type: 'text',
        id: 'hName',
        placeholder: 'Hotel name'
    })
    objectAssign(hAddressInput, {
        type: 'text',
        id: 'hAddress',
        placeholder: 'Hotel address'
    })
    objectAssign(hCheckInDate, {
        type: 'date',
        id: 'hCheckInDate',
    })
    objectAssign(hCheckInTime, {
        type: 'time',
        id: 'hCheckInTime',
    })
    objectAssign(hCheckOutDate, {
        type: 'date',
        id: 'hCheckOutDate',
    })
    objectAssign(hCheckOutTime, {
        type: 'time',
        id: 'hCheckOutTime',
    })
    objectAssign(hExtraInfo, {
        type: 'text',
        id: 'hExtraInfo',
        placeholder: 'Add extra information'
    })
    objectAssign(hSubmit, {
        type: 'submit',
        id: 'hSubmit',
        value: 'Submit'
    })
    
}