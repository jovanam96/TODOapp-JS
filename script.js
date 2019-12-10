var id;

(function init() {

    if (localStorage.getItem("taskId") == null) {
        localStorage.setItem("taskId", 1);
    }
    id = localStorage.getItem("taskId");

    for (let i = 1; i < id; i++) {

        var task = localStorage.getItem(i);

        if (task != null) {
            addItemToTheList(task, i);
        }
    }

})();

function addTask(task) {
    var task = document.getElementById("task").value;

    if (task === "") {
        alert("Task can not be empty!");
    } else {

        addItemToTheList(task, id);

        localStorage.setItem(id, task);
        localStorage.setItem("taskId", ++id);

        document.getElementById("task").value = "";
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
    label.textContent = item;
    label.for = "checkbox";

    var editButton = document.createElement("button");
    editButton.setAttribute("onclick", "editTask(event)");
    editButton.textContent = "Edit";

    var deleteButton = document.createElement("button");
    deleteButton.setAttribute("onclick", "deleteTask(event)");
    deleteButton.textContent = "Delete";

    taskListItem.appendChild(checkbox);
    taskListItem.appendChild(label);
    taskListItem.appendChild(deleteButton);
    taskListItem.appendChild(editButton);
    taskList.appendChild(taskListItem);
}

function editTask(event) {
    var p = prompt("Edit task");
    listItem = event.target.parentElement;
    listItem.querySelector("label").textContent = p;
    localStorage.setItem(listItem.id, p);
}

function deleteTask() {
    var result = confirm("Are you sure you want to delete task?");
    if (result) {
        listItem = event.target.parentElement;
        localStorage.removeItem(listItem.id);
        listItem.parentNode.removeChild(listItem);
    }
}
