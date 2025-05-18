document.addEventListener('DOMContentLoaded', function() {
    const taskList = document.getElementById('taskList');
    const newTaskInput = document.getElementById('newTask');
    const addBtn = document.getElementById('addBtn');

    taskList.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-btn')) {
            const listItem = event.target.closest('li');
            if (listItem) {
                listItem.remove();
            }
        }
    });

    addBtn.addEventListener('click', addNewTask);

    newTaskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addNewTask();
        }
    });

    function addNewTask() {
        const taskText = newTaskInput.value.trim();

        if (taskText !== '') {
            const newItem = document.createElement('li');
            newItem.className = 'task-item';

            const taskSpan = document.createElement('span');
            taskSpan.className = 'task-text';
            taskSpan.textContent = taskText;
            newItem.appendChild(taskSpan);

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.textContent = 'Delete';
            newItem.appendChild(deleteBtn);

            taskList.appendChild(newItem);

            newTaskInput.value = '';
            newTaskInput.focus();
        }
    }
});