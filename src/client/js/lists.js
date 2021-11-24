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
    var editInput = document.createElement('input')
    var editButton = document.createElement('button')
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
