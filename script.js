var id;

(function init() {

    if (localStorage.getItem("taskId") == null) {
        localStorage.setItem("taskId", 1);
    }
    id = localStorage.getItem("taskId");

    for (var i = 1; i < id; i++) {

        var task = JSON.parse(localStorage.getItem(i));

        if (task != null) {
            addItemToTheList(task, i);
        }
    }

})();

function addTask(task) {

    var name = document.getElementById("taskName").value;
    var description = document.getElementById("taskDescription").value;
    var priority = document.getElementById("taskPriority")
    var selectedPriority = priority[priority.selectedIndex].value;
    
    var task = new Task(name, description, selectedPriority);

    if (description === "") {
        alert("Task can not be empty!");
    } else {

        addItemToTheList(task, id);

        localStorage.setItem(id, JSON.stringify(task));
        localStorage.setItem("taskId", ++id);

        document.getElementById("taskName").value = "";
        document.getElementById("taskDescription").value = "";
        document.getElementById("taskPriority").selectedIndex = 0;
    }
    
}

function addItemToTheList(item, i) {
    var taskList = document.getElementById("taskList");
    var taskListItem = document.createElement("li");
    taskListItem.id = i;

    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");

    var label = document.createElement("label");
    label.textContent = item.description;
    label.for = "checkbox";

    var editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click" , function() {
        editTask(event);
    })

    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function() {
        deleteTask(event);
    })

    taskListItem.appendChild(checkbox);
    taskListItem.appendChild(label);
    taskListItem.appendChild(deleteButton);
    taskListItem.appendChild(editButton);
    taskList.appendChild(taskListItem);
}

function editTask(event) {
    var p = prompt("Edit task");
    listItem = event.target.parentElement;
    if (p === "") {
        alert("Task can not be empty!");
    } else {
        var task = JSON.parse(localStorage.getItem(listItem.id));
        listItem.querySelector("label").textContent = p;
        task.description = p;
        task.lastModified = new Date();
        localStorage.setItem(listItem.id, JSON.stringify(task));
    }
}

function deleteTask() {
    var result = confirm("Are you sure you want to delete task?");
    if (result) {
        listItem = event.target.parentElement;
        localStorage.removeItem(listItem.id);
        listItem.parentNode.removeChild(listItem);
    }
}


function Task(name, description, priority) {
    this.name = name;
    this.description = description;
    this.lastModified = new Date();
    this.priority = priority;
}


