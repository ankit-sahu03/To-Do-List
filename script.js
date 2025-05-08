// Attempt to safely load tasks from localStorage
let tasks = [];
try {
  tasks = JSON.parse(localStorage.getItem("tasks")) || [];
} catch (error) {
  console.error("Failed to parse tasks from localStorage:", error);
  tasks = [];
}

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add a new task
function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    tasks.push({ text: taskText, completed: false });
    saveTasks();
    displayTasks();
    taskInput.value = "";
  } else {
    alert("Task cannot be empty!");
  }
}

// Display all tasks in the list
function displayTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.onchange = () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      displayTasks();
    };

    const span = document.createElement("span");
    span.textContent = task.text;
    if (task.completed) span.classList.add("completed");

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.className = "edit-button";
    editButton.onclick = () => {
      const newTask = prompt("Edit task:", task.text);
      if (newTask !== null && newTask.trim() !== "") {
        tasks[index].text = newTask.trim();
        saveTasks();
        displayTasks();
      }
    };

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button");
    deleteButton.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      displayTasks();
    };

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
  });
}

// Initialize app
window.onload = () => {
  const addTaskBtn = document.getElementById("addTaskBtn");
  const taskInput = document.getElementById("taskInput");

  addTaskBtn.addEventListener("click", addTask);

  // Add keyboard "Enter" support
  taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  });

  displayTasks();
};
