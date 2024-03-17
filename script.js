
/**
 * document.querySelector() selects the form input field with the class in 
 * parenthesis (for example "todo-input") and assigns it to a constant variable.
 * It is referencing html elements in index.html.
*/
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Adds an event listener to the entire document that listens 
// for when the DOM content is fully loaded.
document.addEventListener("DOMContentLoaded", getLocalTodos);

// Adds an event listener to the todoButton element that listens 
// for a click event and calls the addTodo function.
todoButton.addEventListener("click", addTodo);

todoList.addEventListener("click", deleteCheck);

// Adds an event listener to the filterOption element that listens
// for a change event and calls the filterTodo function.
filterOption.addEventListener("change", filterTodo);

function addTodo(event) {
    // Prevents the default behavior of the event (e.g., form submission) 
    // to avoid page reload.
    event.preventDefault();

    // Creates a new div element for the todo item and adds the "todo" class
    // to it.
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // Creates a new list item element for the todo text and adds the input 
    // value to it.
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value; 

    // Adds the "todo-item" class to the new todo list item.
    newTodo.classList.add("todo-item");

    // Appends the new todo list item to the todoDiv.
    todoDiv.appendChild(newTodo);

    // Adding the todo input value to local storage.
    saveLocalTodos(todoInput.value);
    
    // Creates a new button element for marking todo as completed, establishes 
    // the html code for it, and assigns the complete-btn class to it.
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check-circle"></li>';
    completedButton.classList.add("complete-btn");

    // Appends the 'completed' button to the todoDiv.
    todoDiv.appendChild(completedButton);

    // Creates a new button element for deleting the todo item, establishes 
    // the html code for it, and adds the trash-btn class to it.
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></li>';
    trashButton.classList.add("trash-btn");

    // Appends the 'trash' button to the todoDiv.
    todoDiv.appendChild(trashButton);
    
    // Appends the todoDiv to the todoList and clears the input value after 
    // adding the todo item.
    todoList.appendChild(todoDiv);
    todoInput.value = "";
}


function deleteCheck(e) {
    // Gets the target element of the event.
    const item = e.target;

    // Checks if the clicked element has the class "trash-btn" 
    // (indicating trash button was clicked).
    if(item.classList[0] === "trash-btn") {
        // Gets the parent element of the clicked button (the todo item).
        const todo = item.parentElement;
        // Adds the "slide" class to the todo item for animation.
        todo.classList.add("slide");
        // Removes the todo item from local storage.
        removeLocalTodos(todo);
        // Listens for the end of the CSS transition (animation).
        todo.addEventListener("transitionend", function() {
            // Removes the todo item from the DOM.
            todo.remove();
        });
    }

    // Checks if the clicked element has the class "complete-btn" 
    // (indicating the complete button was clicked).
    if(item.classList[0] === "complete-btn") {
        // Gets the parent element of the clicked button (the todo item).
        const todo = item.parentElement;
        // Toggles the "completed" class on the todo item to visually mark it as 
        // completed or incomplete.
        todo.classList.toggle("completed");
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch(e.target.value) {
            case "all": 
                todo.style.display = "flex";
                break;
            case "completed": 
                if(todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "incomplete":
                if(!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalTodos(todo) {
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getLocalTodos() {
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check-circle"></li>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></li>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo) {
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}