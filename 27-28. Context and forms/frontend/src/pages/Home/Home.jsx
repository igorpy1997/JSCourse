import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import TodoForm from '../../components/TodoForm/TodoForm';
import TodoList from '../../components/TodoList/TodoList';
import TodoAPI from '../../api/todoAPI';
import styles from './Home.module.scss';

const Home = () => {
    const { isDark } = useTheme();
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('all'); // all, active, completed

    const api = new TodoAPI();

    useEffect(() => {
        loadTodos();
    }, []);

    const loadTodos = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await api.fetchTodos();
            setTodos(data);
        } catch (err) {
            setError('Помилка завантаження завдань');
            console.error('Load todos error:', err);
        } finally {
            setLoading(false);
        }
    };

    const addTodo = async (text) => {
        try {
            setError(null);
            const newTodo = await api.createTodo(text);
            setTodos(prev => [newTodo, ...prev]);
            return true;
        } catch (err) {
            setError('Помилка додавання завдання');
            console.error('Add todo error:', err);
            return false;
        }
    };

    const toggleTodo = async (id, completed) => {
        try {
            setError(null);
            await api.updateTodo(id, { completed });
            setTodos(prev =>
                prev.map(todo =>
                    todo._id === id ? { ...todo, completed } : todo
                )
            );
        } catch (err) {
            setError('Помилка оновлення завдання');
            console.error('Toggle todo error:', err);
        }
    };

    const deleteTodo = async (id) => {
        try {
            setError(null);
            await api.deleteTodo(id);
            setTodos(prev => prev.filter(todo => todo._id !== id));
        } catch (err) {
            setError('Помилка видалення завдання');
            console.error('Delete todo error:', err);
        }
    };

    const clearCompleted = async () => {
        try {
            setError(null);
            await api.clearCompleted();
            setTodos(prev => prev.filter(todo => !todo.completed));
        } catch (err) {
            setError('Помилка очищення завершених завдань');
            console.error('Clear completed error:', err);
        }
    };

    const filteredTodos = todos.filter(todo => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
    });

    const stats = {
        total: todos.length,
        completed: todos.filter(t => t.completed).length,
        active: todos.filter(t => !t.completed).length
    };

    return (
        <div className={isDark ? styles.dark : styles.light}>
            <div className={styles.container}>
                <div className={styles.todoCard}>
                    <h1 className={styles.title}>ToDo List</h1>

                    <TodoForm onAddTodo={addTodo} loading={loading} />

                    {error && (
                        <div className={styles.error}>
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
                            onClick={() => setFilter('all')}
                        >
                            Всі
                        </button>
                        <button
                            className={`${styles.filterBtn} ${filter === 'active' ? styles.active : ''}`}
                            onClick={() => setFilter('active')}
                        >
                            Активні
                        </button>
                        <button
                            className={`${styles.filterBtn} ${filter === 'completed' ? styles.active : ''}`}
                            onClick={() => setFilter('completed')}
                        >
                            Виконані
                        </button>
                    </div>

                    <TodoList
                        todos={filteredTodos}
                        onToggleTodo={toggleTodo}
                        onDeleteTodo={deleteTodo}
                        loading={loading}
                    />

                    {stats.completed > 0 && (
                        <div className={styles.actions}>
                            <button
                                className={styles.clearBtn}
                                onClick={clearCompleted}
                            >
                                🗑️ Очистити виконані ({stats.completed})
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;