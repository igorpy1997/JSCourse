import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import todoReducer from './slices/todoSlice';
import swapiReducer from './slices/swapiSlice';
import rootSaga from './sagas/rootSaga';

// Создаем saga middleware
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        todos: todoReducer,
        swapi: swapiReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST'],
            },
        }).concat(sagaMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
});

// Запускаем root saga
sagaMiddleware.run(rootSaga);