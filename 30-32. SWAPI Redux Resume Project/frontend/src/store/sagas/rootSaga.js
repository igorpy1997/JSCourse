import { all } from 'redux-saga/effects';
import todoSaga from './todoSaga';

export default function* rootSaga() {
    yield all([
        todoSaga(),
        // Здесь будем добавлять другие саги если нужно
    ]);
}