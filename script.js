let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        function saveTasks() {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

        function addTask() {
            const taskInput = document.getElementById("taskInput");
            const taskText = taskInput.value.trim();

            if (taskText !== "") {
                tasks.push({ text: taskText, completed: false });
                saveTasks();
                displayTasks();
                taskInput.value = '';
            } else {
                alert("Task cannot be empty!");
            }
        }

        function displayTasks() {
            const taskList = document.getElementById("taskList");
            taskList.innerHTML = '';

            tasks.forEach((task, index) => {
                const li = document.createElement("li");

                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.checked = task.completed;
                checkbox.onchange = () => {
                    tasks[index].completed = !tasks[index].completed;
                    saveTasks();
                };

                const span = document.createElement("span");
                span.textContent = task.text;
                if (task.completed) span.classList.add("completed");

                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.onclick = () => {
                    const newTask = prompt("Edit task:", task.text);
                    if (newTask !== null && newTask.trim() !== "") {
                        tasks[index].text = newTask.trim();
                        saveTasks();
                        displayTasks();
                    }
                };

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.classList.add('delete-button');
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

        window.onload = displayTasks;