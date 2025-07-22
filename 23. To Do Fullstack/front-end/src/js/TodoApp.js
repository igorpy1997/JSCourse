import TodoAPI from './api.js';

class TodoApp {
    constructor() {
        this.api = new TodoAPI();
        this.currentFilter = 'all';
        this.todos = [];
        this.isLoading = false;
        this.isOnline = true;

        this.init();
    }

    async init() {
        this.bindEvents();
        this.showLoading(true);

        // Check server connection
        this.isOnline = await this.api.checkConnection();

        if (!this.isOnline) {
            this.showError('Server unavailable. Check connection.');
            this.showOfflineMode();
        } else {
            await this.loadTodos();
        }

        this.showLoading(false);
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
            const todoId = $(e.target).data('todo-id');
            const $item = $(`.todo-item[data-id="${todoId}"]`);
            const $checkbox = $item.find('.todo-checkbox');

            $checkbox.prop('checked', !$checkbox.prop('checked')).trigger('change');
            $('#taskModal').modal('hide');
        });

        // Connection recovery updates
        $(window).on('online', () => {
            console.log('Connection restored');
            this.isOnline = true;
            this.hideOfflineMode();
            this.loadTodos();
        });

        $(window).on('offline', () => {
            console.log('Connection lost');
            this.isOnline = false;
            this.showOfflineMode();
        });
    }

    showLoading(show) {
        this.isLoading = show;
        if (show) {
            $('#todoList').html('<li class="list-group-item text-center">🔄 Loading...</li>');
            $('#todoInput').prop('disabled', true);
        } else {
            $('#todoInput').prop('disabled', false);
        }
    }

    showOfflineMode() {
        $('#todoList').html('<li class="list-group-item text-center text-warning">⚠️ No server connection</li>');
        $('.todo-stats').html('<span class="badge bg-warning">Offline mode</span>');
    }

    hideOfflineMode() {
        this.showSuccess('Connection restored!');
    }

    async loadTodos() {
        if (!this.isOnline) return;

        try {
            this.todos = await this.api.fetchTodos();
            this.renderTodos();
            this.updateStats();
        } catch (error) {
            this.showError('Error loading tasks: ' + error.message);
            console.error('Load todos error:', error);
        }
    }

    renderTodos() {
        $('#todoList').empty();

        if (this.todos.length === 0) {
            $('#todoList').html('<li class="list-group-item text-center text-muted">📝 No tasks yet</li>');
            return;
        }

        this.todos.forEach(todo => {
            const $taskElement = this.createTaskElement(todo);
            $('#todoList').append($taskElement);
        });

        this.filterTasks();
    }

    getFilterType(filterId) {
        const filterMap = {
            'filterAll': 'all',
            'filterActive': 'active',
            'filterCompleted': 'completed'
        };
        return filterMap[filterId] || 'all';
    }

    async addNewTask() {
        if (this.isLoading || !this.isOnline) return;

        const taskText = $('#todoInput').val().trim();
        if (!taskText) return;

        if (taskText.length > 500) {
            this.showError('Task text too long (max 500 characters)');
            return;
        }

        try {
            this.showLoading(true);
            const newTodo = await this.api.createTodo(taskText);

            this.todos.unshift(newTodo);
            this.renderTodos();
            this.updateStats();

            $('#todoInput').val('');
            this.showSuccess('Task added!');
        } catch (error) {
            this.showError('Error adding task: ' + error.message);
            console.error('Add task error:', error);
        } finally {
            this.showLoading(false);
        }
    }

    createTaskElement(todo) {
        const $listItem = $('<li>')
            .addClass('list-group-item d-flex justify-content-between align-items-center todo-item')
            .attr('data-id', todo._id);

        if (todo.completed) {
            $listItem.addClass('completed');
        }

        const $formCheck = $('<div>').addClass('form-check flex-grow-1');

        const $checkbox = $('<input>')
            .addClass('form-check-input todo-checkbox')
            .attr({
                type: 'checkbox',
                id: `task${todo._id}`,
                ...(todo.completed && { checked: true })
            });

        const $label = $('<label>')
            .addClass('form-check-label todo-text ms-2')
            .attr('for', `task${todo._id}`)
            .text(todo.text);

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

    async toggleTaskComplete($item) {
        if (this.isLoading || !this.isOnline) return;

        const todoId = $item.data('id');
        const $checkbox = $item.find('.todo-checkbox');
        const isChecked = $checkbox.prop('checked');

        try {
            await this.api.updateTodo(todoId, { completed: isChecked });

            // Update local state
            const todo = this.todos.find(t => t._id === todoId);
            if (todo) {
                todo.completed = isChecked;
            }

            $item.toggleClass('completed', isChecked);
            this.updateStats();
            this.filterTasks();

            const status = isChecked ? 'completed' : 'active';
            this.showSuccess(`Task marked as ${status}`);
        } catch (error) {
            // Revert checkbox on error
            $checkbox.prop('checked', !isChecked);
            this.showError('Error updating task: ' + error.message);
            console.error('Toggle task error:', error);
        }
    }

    async deleteTask($item) {
        if (this.isLoading || !this.isOnline) return;

        const todoId = $item.data('id');

        // Confirm deletion
        if (!confirm('Are you sure you want to delete this task?')) {
            return;
        }

        try {
            await this.api.deleteTodo(todoId);

            // Remove from local state
            this.todos = this.todos.filter(t => t._id !== todoId);

            $item.remove();
            this.updateStats();
            this.showSuccess('Task deleted!');
        } catch (error) {
            this.showError('Error deleting task: ' + error.message);
            console.error('Delete task error:', error);
        }
    }

    showTaskModal($item) {
        const todoId = $item.data('id');
        const todo = this.todos.find(t => t._id === todoId);

        if (!todo) return;

        const status = todo.completed ? 'completed' : 'active';
        const createdDate = new Date(todo.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        const modalData = {
            text: todo.text,
            status,
            date: createdDate,
            buttonText: todo.completed ? 'Mark as active' : 'Mark as completed',
            buttonClass: todo.completed ? 'btn-warning' : 'btn-success'
        };

        this.updateModal(modalData, todoId);
    }

    updateModal({ text, status, date, buttonText, buttonClass }, todoId) {
        $('#modalTaskText').text(text);
        $('#modalTaskStatus').text(status);
        $('#modalTaskDate').text(date);
        $('#modalToggleTask')
            .data('todo-id', todoId)
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
    }

    updateStats() {
        const stats = {
            total: this.todos.length,
            completed: this.todos.filter(t => t.completed).length
        };
        stats.active = stats.total - stats.completed;

        Object.entries(stats).forEach(([key, value]) => {
            $(`#${key}Tasks`).text(value);
        });

        $('#clearCompleted').toggle(stats.completed > 0);
    }

    async clearCompletedTasks() {
        if (this.isLoading || !this.isOnline) return;

        const completedCount = this.todos.filter(t => t.completed).length;
        if (completedCount === 0) return;

        if (!confirm(`Delete ${completedCount} completed tasks?`)) {
            return;
        }

        try {
            const result = await this.api.clearCompleted();

            // Update local state
            this.todos = this.todos.filter(t => !t.completed);

            $('.todo-item.completed').remove();
            this.updateStats();
            this.showSuccess(`Deleted ${result.deletedCount} completed tasks`);
        } catch (error) {
            this.showError('Error clearing tasks: ' + error.message);
            console.error('Clear completed error:', error);
        }
    }

    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    showError(message) {
        this.showNotification(message, 'danger');
    }

    showNotification(message, type) {
        const $notification = $(`
            <div class="alert alert-${type} alert-dismissible fade show position-fixed" 
                 style="top: 20px; right: 20px; z-index: 9999; min-width: 300px;">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `);

        $('body').append($notification);

        setTimeout(() => {
            $notification.alert('close');
        }, 4000);
    }
}

export default TodoApp;