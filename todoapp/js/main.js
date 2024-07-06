const todoForm = document.querySelector(".todo-form");

const todoInput = document.querySelector(".todo-input");

const todoItemsList = document.querySelector(".todo-items");

let todos = [];

todoForm.addEventListener('submit', function(event) {
    event.preventDefault();
    addTodo(todoInput.value);
});

const addTodo = item => {
    if (item !== '') {
        const todo = {
            id: Date.now(),
            name: item,
            completed: false
        };

        todos.push(todo);
        addToLocalStorage(todos);
        todoInput.value = '';
    }
}

const renderTodos = todosArray => {
    todoItemsList.innerHTML = '';

    todosArray.forEach(elementNiza => {
        const checked = elementNiza.completed ? 'checked' : '';

        const li = document.createElement("li");
        li.setAttribute("class", "item");
        li.setAttribute("data-key", elementNiza.id);

        if (elementNiza.completed === true) {
            li.classList.add('checked');
        }

        li.innerHTML = `
        <input type="checkbox" class="checkbox" ${checked}>${elementNiza.name}
        <button class="delete-button">x</button>`

        todoItemsList.append(li);
    });
}

const addToLocalStorage = todoArray => {
    localStorage.setItem('todos', JSON.stringify(todoArray));
    renderTodos(todoArray);
}

const getFromLocalStorage = () => {
    const ref = localStorage.getItem('todos');

    if (ref) {
        todos = JSON.parse(ref);
        renderTodos(todos);
    }
}

const toggle = id => {
    todos.forEach(elementNiza => {
        if (elementNiza.id == id) {
            elementNiza.completed = !elementNiza.completed;
        }
    });
    addToLocalStorage(todos);
}

const deleteTodo = id => {
    todos = todos.filter(function(elementNiza) {
        return elementNiza.id != id;
    });
    addToLocalStorage(todos);
}

getFromLocalStorage();

todoItemsList.addEventListener('click', function(event) {
    if (event.target.type === 'checkbox') {
        toggle(event.target.parentElement.getAttribute('data-key'));
    }

    if (event.target.classList.contains('delete-button')) {
        deleteTodo(event.target.parentElement.getAttribute('data-key'));
    }
});
