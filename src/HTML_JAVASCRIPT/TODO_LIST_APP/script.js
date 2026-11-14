document.addEventListener("DOMContentLoaded", () => {
  const todoForm = document.querySelector(".todo-form");
  const todoInput = document.querySelector(".todo-input");
  const todoList = document.querySelector(".todo-list");
  const todoSubmit = document.querySelector(".todo-submit");

  let editMode = false;
  let editItem = null;

  todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const todoText = todoInput.value.trim();

    if (todoText !== "") {
      if (editMode) {
        editItem.firstChild.textContent = todoText;
        todoSubmit.innerText = "Add Todo";
        editMode = false;
        editItem = null;
      } else {
        addTodoItem(todoText);
      }

      todoInput.value = "";
    } else {
      alert("Please enter a todo.");
    }
  });

  todoList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const todoItem = e.target.parentElement; // Get the parent <li> element
      if (e.target.innerText === "Remove") {
        todoList.removeChild(todoItem);
      } else if (e.target.innerText === "Edit") {
        editMode = true;
        editItem = todoItem;
        todoSubmit.innerText = "Edit Todo";
        todoInput.value = todoItem.firstChild.textContent; // Set the input value to the current todo text
        todoInput.focus();
      }
    }
  });

  function addTodoItem(todoText) {
    const todoItem = document.createElement("li");
    const removeButton = document.createElement("button");
    const editButton = document.createElement("button");

    todoItem.innerHTML = `<span>${todoText}</span>`;
    editButton.innerText = "Edit";
    removeButton.innerText = "Remove";

    todoItem.appendChild(editButton);
    todoItem.appendChild(removeButton);

    todoList.appendChild(todoItem);
  }
});
