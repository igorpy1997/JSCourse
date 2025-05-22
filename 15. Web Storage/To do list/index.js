const form = document.querySelector('.js--form');
const todoList = document.querySelector('.js--todos-wrapper');
const todoInput = document.querySelector('.js--form__input');

function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todoList.innerHTML = '';
    todos.forEach(todo => renderTodoItem(todo.text, todo.isChecked));
}

function saveTodos() {
    const todos = [...document.querySelectorAll('.todo-item')].map(item => ({
        text: item.querySelector('.todo-item__description').textContent,
        isChecked: item.classList.contains('todo-item--checked'),
    }));
    localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodoItem(text, isChecked = false) {
    const todoItem = document.createElement('li');
    todoItem.classList.add('todo-item');
    if (isChecked) {
        todoItem.classList.add('todo-item--checked');
    }

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('todo-item__checkbox');
    checkbox.checked = isChecked;

    const description = document.createElement('span');
    description.classList.add('todo-item__description');
    description.textContent = text;

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('todo-item__delete');
    deleteBtn.textContent = 'Видалити';

    todoItem.appendChild(checkbox);
    todoItem.appendChild(description);
    todoItem.appendChild(deleteBtn);

    checkbox.addEventListener('click', () => {
        todoItem.classList.toggle('todo-item--checked');
        saveTodos();
    });

    deleteBtn.addEventListener('click', () => {
        todoItem.remove();
        saveTodos();
    });

    todoList.appendChild(todoItem);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();
    if (text) {
        renderTodoItem(text);
        saveTodos();
        todoInput.value = '';
    }
});

loadTodos();