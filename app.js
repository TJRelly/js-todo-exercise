const todoInput = document.querySelector("input[type=text]");
const addBtn = document.querySelector("input[value=Add]");
const todoList = document.querySelector(".todo-list");

// localStorage.removeItem("todos")

// create list of todo objects
const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];

if (storedTodos.length) {
  for (let i = 0; i < storedTodos.length; i++) {
    let todo = storedTodos[i];
    // Create new li
    const newLi = document.createElement("li");
    newLi.setAttribute("data-id", i);
    newLi.classList.add("todo");
    newLi.innerText = todo.task;
    todoList.append(newLi);
    // Create new remove button
    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove");
    removeBtn.innerText = "X";
    newLi.append(removeBtn);
    // Handle completed
    if(todo.isCompleted) newLi.classList.add("completed");
    // order id's in todo list
    storedTodos[i] = {id: i, task: todo.task, isCompleted: todo.isCompleted}
  }
}

// why is the widjet moving with every page refresh?

// Handle on submit
const addTodo = addBtn.addEventListener("click", function (e) {
  e.preventDefault();

  if (todoInput.value) {
    // Create new li
    const newLi = document.createElement("li");
    newLi.setAttribute("data-id", storedTodos.length);
    newLi.classList.add("todo");
    newLi.innerText = todoInput.value;
    todoList.append(newLi);
    // Create new remove button
    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove");
    removeBtn.innerText = "X";
    newLi.append(removeBtn);

    let id = newLi.getAttribute("data-id");
    //todo object:
    //key: task, value: todo input
    //key: completed, value: boolean
    storedTodos.push({ id: id, task: todoInput.value, isCompleted: false });
    localStorage.todos = JSON.stringify(storedTodos);
    todoInput.value = "";
  }
});

addBtn.addEventListener("keypress", function (e) {
  e.preventDefault();
  if (e.key === "Enter") addTodo;
});

// is there a way to just capture the li text without all these work arounds?
// should I have appened the HTML elements differently?
// used id's instead of inner text

// Handle remove and completed
todoList.addEventListener("click", function (e) {
  if (e.target.tagName === "BUTTON") {
    e.target.parentElement.remove();
    let targetId = e.target.parentElement.dataset.id;
    for (let i = 0; i < storedTodos.length; i++) {
      let todo = storedTodos[i];
      if (todo.id == targetId) storedTodos.splice(i, 1);
    }
  } else if (e.target.tagName === "LI") {
    const targetId = e.target.dataset.id;
    e.target.classList.toggle("completed");
    for (const todo of storedTodos) {
      if (todo.id == targetId) todo.isCompleted = !todo.isCompleted;
    }
  }
  localStorage.todos = JSON.stringify(storedTodos);
});
