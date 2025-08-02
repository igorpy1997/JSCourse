import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import todoReducer from './slices/todoSlice';
import rootSaga from './sagas/rootSaga';

// Создаем saga middleware
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        todos: todoReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: false, // Отключаем thunk, используем saga
            serializableCheck: {
                ignoredActions: ['persist/PERSIST'], // Если используете redux-persist
            },
        }).concat(sagaMiddleware),
});

// Запускаем root saga
sagaMiddleware.run(rootSaga);