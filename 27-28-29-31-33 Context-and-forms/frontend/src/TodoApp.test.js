import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Home from './pages/Home/Home';
import todoReducer, {
    fetchTodosStart,
    fetchTodosSuccess,
    createTodoStart,
    createTodoSuccess
} from './store/slices/todoSlice';

jest.mock('./api/todoAPI', () => {
    return jest.fn().mockImplementation(() => ({
        fetchTodos: jest.fn().mockResolvedValue([]),
        createTodo: jest.fn().mockResolvedValue({
            _id: '1',
            text: 'Test todo',
            completed: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }),
        updateTodo: jest.fn().mockResolvedValue({
            _id: '1',
            text: 'Updated todo',
            completed: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }),
        deleteTodo: jest.fn().mockResolvedValue({ _id: '1' }),
        clearCompleted: jest.fn().mockResolvedValue({ deletedCount: 1 })
    }));
});

function* mockFetchTodosSaga() {
    yield put(fetchTodosSuccess([]));
}

function* mockCreateTodoSaga(action) {
    const newTodo = {
        _id: Date.now().toString(),
        text: action.payload,
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    yield put(createTodoSuccess(newTodo));
}

function* mockSaga() {
    yield takeEvery(fetchTodosStart.type, mockFetchTodosSaga);
    yield takeEvery(createTodoStart.type, mockCreateTodoSaga);
}

const createTestStore = () => {
    const sagaMiddleware = createSagaMiddleware();

    const store = configureStore({
        reducer: {
            todos: todoReducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: false,
                serializableCheck: false
            }).concat(sagaMiddleware),
    });

    sagaMiddleware.run(mockSaga);

    return store;
};

const HomeWrapper = () => {
    const store = createTestStore();

    return (
        <Provider store={store}>
            <MemoryRouter>
                <ThemeProvider>
                    <Home />
                </ThemeProvider>
            </MemoryRouter>
        </Provider>
    );
};

describe('TODO Application Tests', () => {
    const waitForLoad = async () => {
        await waitFor(() => {
            expect(screen.queryByText(/завантаження завдань/i)).not.toBeInTheDocument();
        }, { timeout: 2000 });
    };

    test('1. Page has TODO title', async () => {
        render(<HomeWrapper />);

        await waitForLoad();

        const title = screen.getByText(/todo list with redux-saga/i);
        expect(title).toBeInTheDocument();
    });

    test('2. Input field accepts both numbers and letters', async () => {
        const user = userEvent.setup();
        render(<HomeWrapper />);

        await waitForLoad();

        const input = screen.getByPlaceholderText(/додати нове завдання/i);

        await user.clear(input);
        await user.type(input, 'Buy milk');
        expect(input).toHaveValue('Buy milk');

        await user.clear(input);
        await user.type(input, '12345');
        expect(input).toHaveValue('12345');

        await user.clear(input);
        await user.type(input, 'Task #123');
        expect(input).toHaveValue('Task #123');
    });

    test('3. Shows error when clicking "Add" without text', async () => {
        const user = userEvent.setup();
        render(<HomeWrapper />);

        await waitForLoad();

        const input = screen.getByPlaceholderText(/додати нове завдання/i);

        // Убеждаемся, что поле пустое
        await user.clear(input);

        // Пытаемся отправить форму с пустым полем
        const submitButton = screen.getByRole('button', { name: /додати/i });
        await user.click(submitButton);

        // Проверяем, что появилась ошибка
        await waitFor(() => {
            expect(screen.getByText(/поле обов'язкове для заповнення/i)).toBeInTheDocument();
        }, { timeout: 2000 });
    });

    test('4. After adding text and clicking "Add" new item appears in list', async () => {
        const user = userEvent.setup();
        render(<HomeWrapper />);

        await waitForLoad();

        const input = screen.getByPlaceholderText(/додати нове завдання/i);

        const taskText = 'Test task for verification';

        await user.clear(input);
        await user.type(input, taskText);

        await waitFor(() => {
            const submitButton = screen.getByRole('button', { name: /додати/i });
            expect(submitButton).not.toBeDisabled();
        });

        const submitButton = screen.getByRole('button', { name: /додати/i });
        await user.click(submitButton);

        await waitFor(() => {
            expect(input).toHaveValue('');
        }, { timeout: 2000 });
    });

    test('5. Task filtering works (All/Active/Completed)', async () => {
        const user = userEvent.setup();
        render(<HomeWrapper />);

        await waitForLoad();

        const allFilter = screen.getByRole('button', { name: /всі/i });
        const activeFilter = screen.getByRole('button', { name: /активні/i });
        const completedFilter = screen.getByRole('button', { name: /виконані/i });

        expect(allFilter).toBeInTheDocument();
        expect(activeFilter).toBeInTheDocument();
        expect(completedFilter).toBeInTheDocument();

        expect(allFilter).toHaveClass('active');

        await user.click(activeFilter);
        expect(activeFilter).toHaveClass('active');

        await user.click(completedFilter);
        expect(completedFilter).toHaveClass('active');
    });

    test('6. Validates minimum length (5 characters)', async () => {
        const user = userEvent.setup();
        render(<HomeWrapper />);

        await waitForLoad();

        const input = screen.getByPlaceholderText(/додати нове завдання/i);

        await user.clear(input);
        await user.type(input, 'abc');

        const submitButton = screen.getByRole('button', { name: /додати/i });
        await user.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/мінімальна довжина - 5 символів/i)).toBeInTheDocument();
        }, { timeout: 2000 });
    });

    test('7. Character counter is displayed', async () => {
        const user = userEvent.setup();
        render(<HomeWrapper />);

        await waitForLoad();

        const input = screen.getByPlaceholderText(/додати нове завдання/i);

        await user.clear(input);
        await user.type(input, 'Test');

        await waitFor(() => {
            const counterElement = screen.getByText(/4\/500 символів/i);
            expect(counterElement).toBeInTheDocument();
        }, { timeout: 1000 });
    });

    test('8. Task statistics are displayed', async () => {
        render(<HomeWrapper />);

        await waitForLoad();

        expect(screen.getByText(/всього:/i)).toBeInTheDocument();
        expect(screen.getByText(/активних:/i)).toBeInTheDocument();
        expect(screen.getByText(/виконано:/i)).toBeInTheDocument();
    });
});