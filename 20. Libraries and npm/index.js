$(document).ready(function() {
    let taskIdCounter = 3;
    let currentFilter = 'all';

    loadFromStorage();

    $('#todoForm').on('submit', function(e) {
        e.preventDefault();
        addNewTask();
    });

    $(document).on('change', '.todo-checkbox', function() {
        const $item = $(this).closest('.todo-item');
        toggleTaskComplete($item);
    });

    $(document).on('click', '.delete-btn', function() {
        const $item = $(this).closest('.todo-item');
        deleteTask($item);
    });

    $(document).on('click', '.view-btn', function() {
        const $item = $(this).closest('.todo-item');
        showTaskModal($item);
    });

    $('input[name="filter"]').on('change', function() {
        const filterId = $(this).attr('id');
        if (filterId === 'filterAll') {
            currentFilter = 'all';
        } else if (filterId === 'filterActive') {
            currentFilter = 'active';
        } else if (filterId === 'filterCompleted') {
            currentFilter = 'completed';
        }
        console.log('Filter changed to:', currentFilter);
        filterTasks();
    });

    $('#clearCompleted').on('click', function() {
        clearCompletedTasks();
    });

    $('#modalToggleTask').on('click', function() {
        const taskId = $(this).data('task-id');
        const $item = $(`.todo-item[data-id="${taskId}"]`);
        const $checkbox = $item.find('.todo-checkbox');

        $checkbox.prop('checked', !$checkbox.prop('checked')).trigger('change');
        $('#taskModal').modal('hide');
    });

    function addNewTask() {
        const taskText = $('#todoInput').val().trim();
        if (!taskText) return;

        const taskId = taskIdCounter++;

        const $listItem = $('<li>')
            .addClass('list-group-item d-flex justify-content-between align-items-center todo-item')
            .attr('data-id', taskId);

        const $formCheck = $('<div>').addClass('form-check flex-grow-1');

        const $checkbox = $('<input>')
            .addClass('form-check-input todo-checkbox')
            .attr({
                'type': 'checkbox',
                'id': `task${taskId}`
            });

        const $label = $('<label>')
            .addClass('form-check-label todo-text ms-2')
            .attr('for', `task${taskId}`)
            .text(taskText);

        const $actions = $('<div>').addClass('todo-actions');

        const $viewBtn = $('<button>')
            .addClass('btn btn-sm btn-outline-secondary view-btn me-2')
            .attr({
                'data-bs-toggle': 'modal',
                'data-bs-target': '#taskModal'
            })
            .text('👁️');

        const $deleteBtn = $('<button>')
            .addClass('btn btn-sm btn-outline-danger delete-btn')
            .text('🗑️');

        $formCheck.append($checkbox, $label);
        $actions.append($viewBtn, $deleteBtn);
        $listItem.append($formCheck, $actions);

        $('#todoList').append($listItem);
        $('#todoInput').val('');

        saveToStorage();
        updateStats();
        filterTasks();
    }

    function toggleTaskComplete($item) {
        const $checkbox = $item.find('.todo-checkbox');
        const isChecked = $checkbox.prop('checked');

        if (isChecked) {
            $item.addClass('completed');
        } else {
            $item.removeClass('completed');
        }

        saveToStorage();
        updateStats();
        filterTasks();
    }

    function deleteTask($item) {
        $item.remove();
        saveToStorage();
        updateStats();
    }

    function showTaskModal($item) {
        const taskText = $item.find('.todo-text').text().trim();
        const taskId = $item.data('id');
        const isCompleted = $item.hasClass('completed');
        const status = isCompleted ? 'виконане' : 'активне';

        $('#modalTaskText').text(taskText);
        $('#modalTaskStatus').text(status);
        $('#modalTaskDate').text(new Date().toLocaleDateString('uk-UA'));
        $('#modalToggleTask').data('task-id', taskId);
        $('#modalToggleTask').text(isCompleted ? 'Позначити як активне' : 'Позначити як виконане');

        $('#modalToggleTask').removeClass('btn-primary btn-warning btn-success');
        if (isCompleted) {
            $('#modalToggleTask').addClass('btn-warning');
        } else {
            $('#modalToggleTask').addClass('btn-success');
        }
    }

    function filterTasks() {
        console.log('Filtering tasks, current filter:', currentFilter);
        const $items = $('.todo-item');
        let visibleCount = 0;

        $items.each(function() {
            const $item = $(this);
            const isCompleted = $item.hasClass('completed');
            let shouldShow = false;

            if (currentFilter === 'all') {
                shouldShow = true;
            } else if (currentFilter === 'active') {
                shouldShow = !isCompleted;
            } else if (currentFilter === 'completed') {
                shouldShow = isCompleted;
            }

            console.log('Task text:', $item.find('.todo-text').text().trim(), 'completed:', isCompleted, 'should show:', shouldShow);

            if (shouldShow) {
                $item.css('display', 'flex').removeClass('d-none');
                visibleCount++;
            } else {
                $item.css('display', 'none').addClass('d-none');
            }
        });

        console.log('Visible tasks after filter:', visibleCount);
        updateStats();
    }

    function updateStats() {
        const $allItems = $('.todo-item');
        const $visibleItems = $('.todo-item:visible');
        const total = $allItems.length;
        const completed = $allItems.filter('.completed').length;
        const active = total - completed;

        $('#totalTasks').text(total);
        $('#completedTasks').text(completed);
        $('#activeTasks').text(active);

        $('#clearCompleted').toggle(completed > 0);
    }

    function clearCompletedTasks() {
        $('.todo-item.completed').remove();
        saveToStorage();
        updateStats();
    }

    function saveToStorage() {
        const tasks = [];
        $('.todo-item').each(function() {
            const $item = $(this);
            tasks.push({
                id: $item.data('id'),
                text: $item.find('.todo-text').text().trim(),
                completed: $item.hasClass('completed')
            });
        });
        localStorage.setItem('jquery-todo-tasks', JSON.stringify(tasks));
    }

    function loadFromStorage() {
        const savedTasks = localStorage.getItem('jquery-todo-tasks');
        if (!savedTasks) return;

        const tasks = JSON.parse(savedTasks);
        $('#todoList').empty();

        tasks.forEach(task => {
            const completedClass = task.completed ? 'completed' : '';
            const checkedAttr = task.completed ? 'checked' : '';

            const taskHtml = `
                <li class="list-group-item d-flex justify-content-between align-items-center todo-item ${completedClass}" data-id="${task.id}">
                    <div class="form-check flex-grow-1">
                        <input class="form-check-input todo-checkbox" type="checkbox" id="task${task.id}" ${checkedAttr}>
                        <label class="form-check-label todo-text ms-2" for="task${task.id}">
                            ${task.text}
                        </label>
                    </div>
                    <div class="todo-actions">
                        <button class="btn btn-sm btn-outline-secondary view-btn me-2" data-bs-toggle="modal" data-bs-target="#taskModal">
                            👁️
                        </button>
                        <button class="btn btn-sm btn-outline-danger delete-btn">
                            🗑️
                        </button>
                    </div>
                </li>
            `;

            $('#todoList').append(taskHtml);

            if (task.id >= taskIdCounter) {
                taskIdCounter = task.id + 1;
            }
        });
    }
});