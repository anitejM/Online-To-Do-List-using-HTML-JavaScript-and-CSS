var taskInput = document.getElementById("new-task");
var addButton = document.getElementsByTagName("button")[0];
var incompleteTasksHolder = document.getElementById("incomplete-tasks");
var completedTasksHolder = document.getElementById("completed-tasks");


//create function
var createNewTaskElement = function(taskString) {
    //new li
    var listItem = document.createElement("li");
    //other elements
    //checkbox
    var checkBox = document.createElement("input");
    //label
    var label = document.createElement("label");
    //input
    var editInput = document.createElement("input");
    //edit button 
    var editButton = document.createElement("button");
    //delete button
    var deleteButton = document.createElement("button");

    //modify elements
    checkBox.type = "checkbox";
    editInput.type = "text";
    editButton.innerText = "Edit";
    editButton.className = "edit";
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";

    label.innerText = taskString; //what is input becomes label

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
}

var addTask = function() {
    console.log("Adding task");
    //create item with input text from #new-task
    var listItem = createNewTaskElement(taskInput.value);
    //append listItem to incomplete tasks
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value = ""; //blank input box for new item
}

var editTask = function() {
    console.log("Edit task");
    var listItem = this.parentNode;

    var editInput = listItem.querySelector("input[type=text]");
    var label = listItem.querySelector("label");
    var editbutton = listItem.querySelector("button.edit");

    var containsClass = listItem.classList.contains("editMode");
    //if class of parent is editMode
    if(containsClass) {
        //switch out of edit mode and label shows in input
        label.innerText =  editInput.value;
        editbutton.innerText = "Edit";
    } else {
        //switch to edit mode and input becomes label
        editInput.value = label.innerText;
        editbutton.innerText = "Submit";
    }
    //toggle between editmode depending on click event
    listItem.classList.toggle("editMode");
}

//delete function
var deleteTask = function() {
    console.log("Delete task");
    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    //remove child from parent list
    ul.removeChild(listItem);
}
//move task to completed
var taskCompleted = function() {
    console.log("Task completed");
    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}
//move task to incomplete
var taskIncomplete = function() {
    console.log("Task incomplete");
    var listItem = this.parentNode;
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}

var bindTaskEvents = function(taskListItem, checkBoxEventHandler){
    console.log("Bind list items to events");
    //select children to bind events to
    var checkBox = taskListItem.querySelector("input[type=checkbox]");
    var editButton = taskListItem.querySelector("button.edit");
    var deleteButton = taskListItem.querySelector("button.delete");

    //edit button to editTask
    editButton.onclick = editTask;
    //delete button to deleteTask
    deleteButton.onclick = deleteTask;
    //bind checkbox to checkbox
    checkBox.onchange = checkBoxEventHandler;
}

var ajaxRequest = function() {
    console.log("AJAX Request");
}

//for add button add task
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

//bind incompleteTaskHolder ul to taskCompleted 
for(var i = 0; i < incompleteTasksHolder.children.length; i++) {
    bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}
//and vice-versa
for(var i = 0; i < completedTasksHolder.children.length; i++) {
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
