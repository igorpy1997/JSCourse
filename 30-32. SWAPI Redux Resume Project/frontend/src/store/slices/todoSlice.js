import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        items: [],
        loading: false,
        error: null,
        filter: 'all', // all, active, completed
    },
    reducers: {
        // Actions для начала операций (Saga)
        fetchTodosStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        createTodoStart: (state) => {
            state.error = null;
        },
        updateTodoStart: (state) => {
            state.error = null;
        },
        deleteTodoStart: (state) => {
            state.error = null;
        },
        clearCompletedStart: (state) => {
            state.error = null;
        },

        // Actions для успешных операций
        fetchTodosSuccess: (state, action) => {
            state.loading = false;
            state.items = action.payload;
        },
        createTodoSuccess: (state, action) => {
            state.items.unshift(action.payload);
        },
        updateTodoSuccess: (state, action) => {
            const index = state.items.findIndex(todo => todo._id === action.payload._id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
        deleteTodoSuccess: (state, action) => {
            state.items = state.items.filter(todo => todo._id !== action.payload);
        },
        clearCompletedSuccess: (state, action) => {
            state.items = state.items.filter(todo => !action.payload.includes(todo._id));
        },

        // Actions для ошибок
        fetchTodosFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        createTodoFailure: (state, action) => {
            state.error = action.payload;
        },
        updateTodoFailure: (state, action) => {
            state.error = action.payload;
        },
        deleteTodoFailure: (state, action) => {
            state.error = action.payload;
        },
        clearCompletedFailure: (state, action) => {
            state.error = action.payload;
        },

        // Обычные actions
        setFilter: (state, action) => {
            state.filter = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
});

export const {
    // Start actions (для Saga)
    fetchTodosStart,
    createTodoStart,
    updateTodoStart,
    deleteTodoStart,
    clearCompletedStart,

    // Success actions
    fetchTodosSuccess,
    createTodoSuccess,
    updateTodoSuccess,
    deleteTodoSuccess,
    clearCompletedSuccess,

    // Failure actions
    fetchTodosFailure,
    createTodoFailure,
    updateTodoFailure,
    deleteTodoFailure,
    clearCompletedFailure,

    // Other actions
    setFilter,
    clearError,
} = todoSlice.actions;

// Селекторы
export const selectTodos = (state) => state.todos.items;
export const selectLoading = (state) => state.todos.loading;
export const selectError = (state) => state.todos.error;
export const selectFilter = (state) => state.todos.filter;

export const selectFilteredTodos = (state) => {
    const todos = selectTodos(state);
    const filter = selectFilter(state);

    if (filter === 'active') return todos.filter(todo => !todo.completed);
    if (filter === 'completed') return todos.filter(todo => todo.completed);
    return todos;
};

export const selectStats = (state) => {
    const todos = selectTodos(state);
    return {
        total: todos.length,
        completed: todos.filter(t => t.completed).length,
        active: todos.filter(t => !t.completed).length
    };
};

export default todoSlice.reducer;