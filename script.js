const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

/* Load saved tasks */
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

/* ===== Render Tasks ===== */
function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {

    const li = document.createElement("li");

    if (task.completed) {
      li.classList.add("completed");
    }

    li.innerHTML = `
      <span>${task.text}</span>

      <div class="task-actions">
        <button class="complete-btn" onclick="toggleTask(${index})">
          ✓
        </button>

        <button class="delete-btn" onclick="deleteTask(${index})">
          ✕
        </button>
      </div>
    `;

    taskList.appendChild(li);
  });

  /* Save tasks */
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* ===== Add Task ===== */
addTaskBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();

  if (text === "") return;

  tasks.push({
    text: text,
    completed: false
  });

  taskInput.value = "";
  renderTasks();
});

/* ===== Mark Complete ===== */
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

/* ===== Delete Task ===== */
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

/* ===== Press Enter to Add ===== */
taskInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    addTaskBtn.click();
  }
});

/* Initial load */
renderTasks();
