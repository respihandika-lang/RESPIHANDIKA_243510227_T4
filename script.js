let todos = JSON.parse(localStorage.getItem("todos")) || [];
let filter = "all";

const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const errorMessage = document.getElementById("error-message");

function saveToLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos() {

  todoList.innerHTML = "";

  let filteredTodos = todos.filter(todo => {

    if (filter === "active") {
      return !todo.completed;
    }

    if (filter === "completed") {
      return todo.completed;
    }

    return true;
  });

  filteredTodos.forEach((todo, index) => {

    const li = document.createElement("li");

    if (todo.completed) {
      li.classList.add("completed");
    }

    li.innerHTML = `
      <span>${todo.text}</span>

      <div class="actions">
        <button onclick="toggleTodo(${index})">✔</button>
        <button onclick="editTodo(${index})">Edit</button>
        <button onclick="deleteTodo(${index})">Hapus</button>
      </div>
    `;

    todoList.appendChild(li);
  });
}

function addTodo() {

  const text = todoInput.value.trim();

  // VALIDASI INPUT
  if (text === "") {

    todoInput.classList.add("error");
    errorMessage.textContent = "Input tidak boleh kosong!";

    return;
  }

  todoInput.classList.remove("error");
  errorMessage.textContent = "";

  todos.push({
    text: text,
    completed: false
  });

  todoInput.value = "";

  saveToLocalStorage();
  renderTodos();
}

function deleteTodo(index) {

  todos.splice(index, 1);

  saveToLocalStorage();
  renderTodos();
}

function toggleTodo(index) {

  todos[index].completed = !todos[index].completed;

  saveToLocalStorage();
  renderTodos();
}

function editTodo(index) {

  const newText = prompt("Edit tugas:", todos[index].text);

  if (newText !== null && newText.trim() !== "") {

    todos[index].text = newText.trim();

    saveToLocalStorage();
    renderTodos();
  }
}

function setFilter(newFilter) {

  filter = newFilter;

  renderTodos();
}

todoInput.addEventListener("input", () => {

  todoInput.classList.remove("error");
  errorMessage.textContent = "";
});

renderTodos();