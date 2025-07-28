import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import TodoItem from '../TodoItem/TodoItem';
import styles from './TodoList.module.scss';

const TodoList = ({ todos, onToggleTodo, onDeleteTodo, loading }) => {
    const { isDark } = useTheme();

    if (loading) {
        return (
            <div className={isDark ? styles.dark : styles.light}>
                <div className={styles.loadingContainer}>
                    <div className={styles.spinner}></div>
                    <p className={styles.loadingText}>Завантаження завдань...</p>
                </div>
            </div>
        );
    }

    if (todos.length === 0) {
        return (
            <div className={isDark ? styles.dark : styles.light}>
                <div className={styles.emptyContainer}>
                    <div className={styles.emptyIcon}>📝</div>
                    <h3 className={styles.emptyTitle}>Немає завдань</h3>
                    <p className={styles.emptyText}>
                        Додайте своє перше завдання використовуючи форму вище
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className={isDark ? styles.dark : styles.light}>
            <div className={styles.todoList}>
                {todos.map((todo, index) => (
                    <TodoItem
                        key={todo._id}
                        todo={todo}
                        onToggle={(completed) => onToggleTodo(todo._id, completed)}
                        onDelete={() => onDeleteTodo(todo._id)}
                        index={index}
                    />
                ))}
            </div>
        </div>
    );
};

export default TodoList;