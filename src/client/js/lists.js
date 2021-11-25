//Make lists buttons drop down the lists
var dropdown = document.getElementsByClassName('dropBtn');
var i;

for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
  this.classList.toggle("active");
  var dropdownContent = this.nextElementSibling;
  if (dropdownContent.style.display === "block") {
  dropdownContent.style.display = "none";
  } else {
  dropdownContent.style.display = "block";
  }
  });
}

//Make task lists

//Packing list
var taskInput = document.getElementById('new-task')
var addButton = document.getElementById('packAddBtn')
var incompleteTasksHolder = document.getElementById('incomplete-tasks')
var completedTasksHolder = document.getElementById('completed-tasks')

//New list item
var createNewTaskElement = function(taskString) {
    //Create list items
    var listItem = document.createElement('li')
    var checkBox = document.createElement('input')
    var label = document.createElement('label')
    var deleteButton = document.createElement('button')

    //Modifying the created elements
    checkBox.type = "checkbox"

    deleteButton.innerText = "X"
    deleteButton.className = "delete"

    label.innerText = taskString

    //Appending
    listItem.appendChild(checkBox)
    listItem.appendChild(label)
    listItem.appendChild(deleteButton)

    return listItem
}

//Add new task
var addTask = function() {
    console.log('Add item..')
    var listItem = createNewTaskElement(taskInput.value)
    incompleteTasksHolder.appendChild(listItem)
    bindTaskEvents(listItem, taskCompleted)

    taskInput.value = ""
}

//Delete existing task
var deleteTask = function() {
    console.log('Delete item..')
    var listItem = this.parentNode
    var ul = listItem.parentNode

    ul.removeChild(listItem)
}

//Mark task complete
var taskCompleted = function() {
    console.log('Task complete..')
    //Append task list item to #completed-tasks
    var listItem = this.parentNode
    completedTasksHolder.appendChild(listItem)
    bindTaskEvents(listItem, taskIncomplete)
}

//Mark task incomplete
var taskIncomplete = function() {
    console.log('Task incomplete')
    //Append list item to #incomplete-tasks
    var listItem = this.parentNode
    incompleteTasksHolder.appendChild(listItem)
    bindTaskEvents(listItem, taskCompleted)
}

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
    console.log('Bind list item events')
    var checkBox = taskListItem.querySelector('input[type=checkbox]')
    var deleteButton = taskListItem.querySelector('button.delete')
    
    deleteButton.onclick = deleteTask
    checkBox.onchange = checkBoxEventHandler
}

//Set the clickhandler to addTask
addButton.addEventListener('click', addTask)

//Cycle over incompleteTasksHolder ul list items
for(var i = 0; i < incompleteTasksHolder.children.length; i++) {
    bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted)
}

//Cycle over completedTasksHolder ul list items
for(var i = 0; i < completedTasksHolder.children.length; i++) {
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete)
}

//Post hotel data to displayData
document.getElementById('hSubmit').addEventListener('click', function(event) {
    const hotelData = document.getElementById('hotelData')
    const name = document.getElementById('hName').value
    const address = document.getElementById('hAddress').value
    const inDate = document.getElementById('hCheckInDate').value
    const inTime = document.getElementById('hCheckInTime').value
    const outDate = document.getElementById('hCheckOutDate').value
    const outTime = document.getElementById('hCheckOutTime').value
    const extra = document.getElementById('hExtraInfo').value

    hotelData.innerHTML = `You're staying in ${name} at ${address} <br>Check In: ${inDate} at ${inTime} <br>Check out: ${outDate} at ${outTime} <br>${extra}<hr>`
})

//Post flight data to displayData
document.getElementById('fSubmit').addEventListener('click', function(event) {
    const flightData = document.getElementById('flightData')
    const outFlight = document.getElementById('outFlight').value
    const outDepDate = document.getElementById('outDepDate').value
    const outDepTime = document.getElementById('outDepTime').value
    const arrDepDate = document.getElementById('outArrDate').value
    const arrDepTime = document.getElementById('outArrTime').value
    const inFlight = document.getElementById('inFlight').value
    const inDepDate = document.getElementById('inDepDate').value
    const inDepTime = document.getElementById('inDepTime').value
    const inArrDate = document.getElementById('inArrDate').value
    const inArrTime = document.getElementById('inArrTime').value
    const extra = document.getElementById('fExtraInfo').value

    flightData.innerHTML = `Your flight ${outFlight} departures on ${outDepDate} at ${outDepTime} and arrives in destination on ${arrDepDate} at ${arrDepTime}.<br>
    Your flight ${inFlight} departures on ${inDepDate} at ${inDepTime} and arrives in destination on ${inArrDate} at ${inArrTime}.<br>${extra}<hr>`
})
