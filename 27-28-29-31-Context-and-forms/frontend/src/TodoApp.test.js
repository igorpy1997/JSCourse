import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import todoReducer from './store/slices/todoSlice';

const createTestStore = () => {
    return configureStore({
        reducer: {
            todos: todoReducer,
        },
    });
};

const AppWrapper = () => {
    const store = createTestStore();

    return (
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    );
};

describe('TODO Application Tests', () => {
    test('1. Page has TODO title', () => {
        render(<AppWrapper />);

        const title = screen.getByText(/todo list with redux-saga/i);
        expect(title).toBeInTheDocument();
    });

    test('2. Input field accepts both numbers and letters', async () => {
        const user = userEvent.setup();
        render(<AppWrapper />);

        const input = screen.getByPlaceholderText(/додати нове завдання/i);

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
        render(<AppWrapper />);

        const input = screen.getByPlaceholderText(/додати нове завдання/i);
        const submitButton = screen.getByRole('button', { name: /додати/i });

        await user.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/поле обов'язкове для заповнення/i)).toBeInTheDocument();
        });
    });

    test('4. After adding text and clicking "Add" new item appears in list', async () => {
        const user = userEvent.setup();
        render(<AppWrapper />);

        const input = screen.getByPlaceholderText(/додати нове завдання/i);
        const submitButton = screen.getByRole('button', { name: /додати/i });

        const taskText = 'Test task for verification';

        await user.type(input, taskText);
        await user.click(submitButton);

        await waitFor(() => {
            expect(input).toHaveValue('');
        });
    });

    test('5. Task filtering works (All/Active/Completed)', async () => {
        const user = userEvent.setup();
        render(<AppWrapper />);

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
        render(<AppWrapper />);

        const input = screen.getByPlaceholderText(/додати нове завдання/i);
        const submitButton = screen.getByRole('button', { name: /додати/i });

        await user.type(input, 'abc');
        await user.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/мінімальна довжина - 5 символів/i)).toBeInTheDocument();
        });
    });

    test('7. Character counter is displayed', async () => {
        const user = userEvent.setup();
        render(<AppWrapper />);

        const input = screen.getByPlaceholderText(/додати нове завдання/i);

        await user.type(input, 'Test');

        expect(screen.getByText(/4\/500 символів/i)).toBeInTheDocument();
    });

    test('8. Task statistics are displayed', () => {
        render(<AppWrapper />);

        expect(screen.getByText(/всього:/i)).toBeInTheDocument();
        expect(screen.getByText(/активних:/i)).toBeInTheDocument();
        expect(screen.getByText(/виконано:/i)).toBeInTheDocument();
    });
});