class TodoApp {
    constructor() {
        this.taskIdCounter = 3;
        this.currentFilter = 'all';
        this.storageKey = 'jquery-todo-tasks';

        this.init();
    }

    init() {
        this.loadFromStorage();
        this.bindEvents();
    }

    bindEvents() {
        $('#todoForm').on('submit', (e) => {
            e.preventDefault();
            this.addNewTask();
        });

        $(document).on('change', '.todo-checkbox', (e) => {
            const $item = $(e.target).closest('.todo-item');
            this.toggleTaskComplete($item);
        });

        $(document).on('click', '.delete-btn', (e) => {
            const $item = $(e.target).closest('.todo-item');
            this.deleteTask($item);
        });

        $(document).on('click', '.view-btn', (e) => {
            const $item = $(e.target).closest('.todo-item');
            this.showTaskModal($item);
        });

        $('input[name="filter"]').on('change', (e) => {
            const filterId = $(e.target).attr('id');
            this.currentFilter = this.getFilterType(filterId);
            this.filterTasks();
        });

        $('#clearCompleted').on('click', () => {
            this.clearCompletedTasks();
        });

        $('#modalToggleTask').on('click', (e) => {
            const taskId = $(e.target).data('task-id');
            const $item = $(`.todo-item[data-id="${taskId}"]`);
            const $checkbox = $item.find('.todo-checkbox');

            $checkbox.prop('checked', !$checkbox.prop('checked')).trigger('change');
            $('#taskModal').modal('hide');
        });
    }

    getFilterType(filterId) {
        const filterMap = {
            'filterAll': 'all',
            'filterActive': 'active',
            'filterCompleted': 'completed'
        };
        return filterMap[filterId] || 'all';
    }

    addNewTask() {
        const taskText = $('#todoInput').val().trim();
        if (!taskText) return;

        const task = {
            id: this.taskIdCounter++,
            text: taskText,
            completed: false
        };

        const $listItem = this.createTaskElement(task);

        $('#todoList').append($listItem);
        $('#todoInput').val('');

        this.saveToStorage();
        this.updateStats();
        this.filterTasks();
    }

    createTaskElement({ id, text, completed }) {
        const $listItem = $('<li>')
            .addClass('list-group-item d-flex justify-content-between align-items-center todo-item')
            .attr('data-id', id);

        if (completed) {
            $listItem.addClass('completed');
        }

        const $formCheck = $('<div>').addClass('form-check flex-grow-1');

        const $checkbox = $('<input>')
            .addClass('form-check-input todo-checkbox')
            .attr({
                type: 'checkbox',
                id: `task${id}`,
                ...(completed && { checked: true })
            });

        const $label = $('<label>')
            .addClass('form-check-label todo-text ms-2')
            .attr('for', `task${id}`)
            .text(text);

        const $actions = this.createTaskActions();

        $formCheck.append($checkbox, $label);
        $listItem.append($formCheck, $actions);

        return $listItem;
    }

    createTaskActions() {
        const $actions = $('<div>').addClass('todo-actions');

        const buttons = [
            {
                classes: 'btn btn-sm btn-outline-secondary view-btn me-2',
                attrs: { 'data-bs-toggle': 'modal', 'data-bs-target': '#taskModal' },
                text: '👁️'
            },
            {
                classes: 'btn btn-sm btn-outline-danger delete-btn',
                text: '🗑️'
            }
        ];

        buttons.forEach(({ classes, attrs = {}, text }) => {
            const $btn = $('<button>')
                .addClass(classes)
                .attr(attrs)
                .text(text);
            $actions.append($btn);
        });

        return $actions;
    }

    toggleTaskComplete($item) {
        const $checkbox = $item.find('.todo-checkbox');
        const isChecked = $checkbox.prop('checked');

        $item.toggleClass('completed', isChecked);

        this.saveToStorage();
        this.updateStats();
        this.filterTasks();
    }

    deleteTask($item) {
        $item.remove();
        this.saveToStorage();
        this.updateStats();
    }

    showTaskModal($item) {
        const { text: taskText, id: taskId, completed: isCompleted } = this.getTaskData($item);
        const status = isCompleted ? 'виконане' : 'активне';

        const modalData = {
            text: taskText,
            status,
            date: new Date().toLocaleDateString('uk-UA'),
            buttonText: isCompleted ? 'Позначити як активне' : 'Позначити як виконане',
            buttonClass: isCompleted ? 'btn-warning' : 'btn-success'
        };

        this.updateModal(modalData, taskId);
    }

    getTaskData($item) {
        return {
            text: $item.find('.todo-text').text().trim(),
            id: $item.data('id'),
            completed: $item.hasClass('completed')
        };
    }

    updateModal({ text, status, date, buttonText, buttonClass }, taskId) {
        $('#modalTaskText').text(text);
        $('#modalTaskStatus').text(status);
        $('#modalTaskDate').text(date);
        $('#modalToggleTask')
            .data('task-id', taskId)
            .text(buttonText)
            .removeClass('btn-primary btn-warning btn-success')
            .addClass(buttonClass);
    }

    filterTasks() {
        const $items = $('.todo-item');
        const filterFunctions = {
            all: () => true,
            active: ($item) => !$item.hasClass('completed'),
            completed: ($item) => $item.hasClass('completed')
        };

        const filterFn = filterFunctions[this.currentFilter];

        $items.each((index, element) => {
            const $item = $(element);
            const shouldShow = filterFn($item);

            $item
                .css('display', shouldShow ? 'flex' : 'none')
                .toggleClass('d-none', !shouldShow);
        });

        this.updateStats();
    }

    updateStats() {
        const $allItems = $('.todo-item');
        const stats = {
            total: $allItems.length,
            completed: $allItems.filter('.completed').length
        };
        stats.active = stats.total - stats.completed;

        Object.entries(stats).forEach(([key, value]) => {
            $(`#${key}Tasks`).text(value);
        });

        $('#clearCompleted').toggle(stats.completed > 0);
    }

    clearCompletedTasks() {
        $('.todo-item.completed').remove();
        this.saveToStorage();
        this.updateStats();
    }

    saveToStorage() {
        const tasks = $('.todo-item').map((index, element) => {
            const $item = $(element);
            return this.getTaskData($item);
        }).get();

        localStorage.setItem(this.storageKey, JSON.stringify(tasks));
    }

    loadFromStorage() {
        const savedTasks = localStorage.getItem(this.storageKey);
        if (!savedTasks) return;

        const tasks = JSON.parse(savedTasks);
        $('#todoList').empty();

        tasks.forEach(task => {
            const $taskElement = this.createTaskElement(task);
            $('#todoList').append($taskElement);

            this.taskIdCounter = Math.max(this.taskIdCounter, task.id + 1);
        });

        this.updateStats();
        this.filterTasks();
    }
}

$(() => new TodoApp());