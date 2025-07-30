// src/store/sagas/rootSaga.js - НОВЫЙ ФАЙЛ
import { all } from 'redux-saga/effects';
import todoSaga from './todoSaga';

export default function* rootSaga() {
    yield all([
        todoSaga(),
    ]);
}