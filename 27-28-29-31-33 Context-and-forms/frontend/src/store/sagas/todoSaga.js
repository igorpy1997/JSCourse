import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects';
import TodoAPI from '../../api/todoAPI';
import {
    // Start actions
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

    selectTodos,
} from '../slices/todoSlice';

const api = new TodoAPI();

function* fetchTodosSaga() {
    try {
        const todos = yield call(api.fetchTodos.bind(api));
        yield put(fetchTodosSuccess(todos));
    } catch (error) {
        yield put(fetchTodosFailure(error.message));
    }
}

function* createTodoSaga(action) {
    try {
        const newTodo = yield call(api.createTodo.bind(api), action.payload);
        yield put(createTodoSuccess(newTodo));
    } catch (error) {
        yield put(createTodoFailure(error.message));
    }
}

function* updateTodoSaga(action) {
    try {
        const { id, updates } = action.payload;
        const updatedTodo = yield call(api.updateTodo.bind(api), id, updates);
        yield put(updateTodoSuccess(updatedTodo));
    } catch (error) {
        yield put(updateTodoFailure(error.message));
    }
}

function* deleteTodoSaga(action) {
    try {
        const id = action.payload;
        yield call(api.deleteTodo.bind(api), id);
        yield put(deleteTodoSuccess(id));
    } catch (error) {
        yield put(deleteTodoFailure(error.message));
    }
}

function* clearCompletedSaga() {
    try {
        yield call(api.clearCompleted.bind(api));

        // Получаем текущее состояние todos и находим завершенные
        const todos = yield select(selectTodos);
        const completedIds = todos
            .filter(todo => todo.completed)
            .map(todo => todo._id);

        yield put(clearCompletedSuccess(completedIds));
    } catch (error) {
        yield put(clearCompletedFailure(error.message));
    }
}

export default function* todoSaga() {
    yield takeLatest(fetchTodosStart.type, fetchTodosSaga);
    yield takeEvery(createTodoStart.type, createTodoSaga);
    yield takeEvery(updateTodoStart.type, updateTodoSaga);
    yield takeEvery(deleteTodoStart.type, deleteTodoSaga);
    yield takeEvery(clearCompletedStart.type, clearCompletedSaga);
}
