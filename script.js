var id;

(function init() {

    var tasks = getTasksFromLocalStorage();

    for (var i = 0; i < tasks.length; i++) {
        addItemToTheList(tasks[i], tasks[i].id);
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
    checkbox.addEventListener("change", function (event) {
        var task = JSON.parse(localStorage.getItem(event.target.parentElement.id));
        if (event.target.checked) {
            task.done = true;
        } else {
            task.done = false;
        }
        localStorage.setItem(event.target.parentElement.id, JSON.stringify(task));
    })
    if (item.done === true) {
        checkbox.click();
    }

    var label = document.createElement("label");
    label.textContent = item.description;
    label.for = "checkbox";
    if (item.priority == 1) {
        label.style.color = "#ff7f50";
    }
    if (item.priority == 2) {
        label.style.color = "#ff6348";
    }
    if (item.priority == 3) {
        label.style.color = "#ff4757";
    }

    var editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", function () {
        editTask(event);
    })

    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function () {
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
    this.done = false;
}

function sortTasks(property, order) {
    var tasks = getTasksFromLocalStorage();

    if (order == "asc") {
        tasks.sort(function (a, b) {
            if (a[property] > b[property]) {
                return 1;
            } else {
                return -1;
            }
            // return a[property] > b[property];
        });
    } else {
        tasks.sort(function (a, b) {
            if (a[property] < b[property]) {
                return 1;
            } else {
                return -1;
            }
        });
    }

    document.getElementById("taskList").innerHTML = "";

    for (var i = 0; i < tasks.length; i++) {
        addItemToTheList(tasks[i], tasks[i].id);
    }
}

function getTasksFromLocalStorage() {

    var tasks = [];

    if (localStorage.getItem("taskId") == null) {
        localStorage.setItem("taskId", 1);
    }
    id = localStorage.getItem("taskId");

    for (var i = 1; i < id; i++) {

        var task = JSON.parse(localStorage.getItem(i));

        if (task != null) {
            task.id = i;
            tasks.push(task);
        }
    }

    return tasks;
}


