import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '../../context/ThemeContext';
import TodoForm from '../../components/TodoForm/TodoForm';
import TodoList from '../../components/TodoList/TodoList';
import {
    fetchTodosStart,
    createTodoStart,
    updateTodoStart,
    deleteTodoStart,
    clearCompletedStart,
    setFilter,
    clearError,
    selectFilteredTodos,
    selectLoading,
    selectError,
    selectFilter,
    selectStats
} from '../../store/slices/todoSlice';
import styles from './Home.module.scss';

const Home = () => {
    const { isDark } = useTheme();
    const dispatch = useDispatch();

    // Получаем данные из Redux store
    const todos = useSelector(selectFilteredTodos);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const filter = useSelector(selectFilter);
    const stats = useSelector(selectStats);

    useEffect(() => {
        dispatch(fetchTodosStart());
    }, [dispatch]);

    const handleAddTodo = async (text) => {
        try {
            dispatch(createTodoStart(text));
            return true;
        } catch (err) {
            return false;
        }
    };

    const handleToggleTodo = async (id, completed) => {
        dispatch(updateTodoStart({ id, updates: { completed } }));
    };

    const handleDeleteTodo = async (id) => {
        dispatch(deleteTodoStart(id));
    };

    const handleClearCompleted = async () => {
        dispatch(clearCompletedStart());
    };

    const handleSetFilter = (newFilter) => {
        dispatch(setFilter(newFilter));
    };

    const handleClearError = () => {
        dispatch(clearError());
    };

    return (
        <div className={isDark ? styles.dark : styles.light}>
            <div className={styles.container}>
                <div className={styles.todoCard}>
                    <h1 className={styles.title}>ToDo List with Redux-Saga</h1>

                    <TodoForm onAddTodo={handleAddTodo} loading={loading} />

                    {error && (
                        <div className={styles.error} onClick={handleClearError}>
                            <span className={styles.errorIcon}>⚠️</span>
                            {error}
                        </div>
                    )}

                    <div className={styles.stats}>
            <span className={styles.statBadge}>
              Всього: <strong>{stats.total}</strong>
            </span>
                        <span className={styles.statBadge}>
              Активних: <strong>{stats.active}</strong>
            </span>
                        <span className={styles.statBadge}>
              Виконано: <strong>{stats.completed}</strong>
            </span>
                    </div>

                    <div className={styles.filters}>
                        <button
                            className={`${styles.filterBtn} ${filter === 'all' ? styles.active : ''}`}
                            onClick={() => handleSetFilter('all')}
                        >
                            Всі
                        </button>
                        <button
                            className={`${styles.filterBtn} ${filter === 'active' ? styles.active : ''}`}
                            onClick={() => handleSetFilter('active')}
                        >
                            Активні
                        </button>
                        <button
                            className={`${styles.filterBtn} ${filter === 'completed' ? styles.active : ''}`}
                            onClick={() => handleSetFilter('completed')}
                        >
                            Виконані
                        </button>
                    </div>

                    <TodoList
                        todos={todos}
                        onToggleTodo={handleToggleTodo}
                        onDeleteTodo={handleDeleteTodo}
                        loading={loading}
                    />

                    {stats.completed > 0 && (
                        <div className={styles.actions}>
                            <button
                                className={styles.clearBtn}
                                onClick={handleClearCompleted}
                            >
                                🗑️ Очистити виконані ({stats.completed})
                            </button>
                        </div>
                    )}

                    <div className={styles.footer}>
                        <div className={styles.totalCount}>
                            📋 Загальна кількість завдань: <strong>{stats.total}</strong>
                        </div>
                        <div className={styles.sagaIndicator}>
                            ⚡ Powered by Redux-Saga
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;