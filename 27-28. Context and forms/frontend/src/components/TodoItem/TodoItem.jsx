import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import styles from './TodoItem.module.scss';

const TodoItem = ({ todo, onToggle, onDelete, index }) => {
    const { isDark } = useTheme();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleToggle = () => {
        onToggle(!todo.completed);
    };

    const handleDelete = async () => {
        if (window.confirm('Ви впевнені, що хочете видалити це завдання?')) {
            setIsDeleting(true);
            try {
                await onDelete();
            } catch (error) {
                setIsDeleting(false);
                console.error('Error deleting todo:', error);
            }
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('uk-UA', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div
            className={`
        ${isDark ? styles.dark : styles.light} 
        ${styles.todoItem} 
        ${todo.completed ? styles.completed : ''} 
        ${isDeleting ? styles.deleting : ''}
      `}
            style={{ '--animation-delay': `${index * 0.1}s` }}
        >
            <div className={styles.content}>
                <div className={styles.checkboxContainer}>
                    <input
                        type="checkbox"
                        id={`todo-${todo._id}`}
                        className={styles.checkbox}
                        checked={todo.completed}
                        onChange={handleToggle}
                    />
                    <label
                        htmlFor={`todo-${todo._id}`}
                        className={styles.checkboxLabel}
                    >
            <span className={styles.customCheckbox}>
              {todo.completed && <span className={styles.checkmark}>✓</span>}
            </span>
                    </label>
                </div>

                <div className={styles.textContainer}>
                    <p className={styles.todoText}>
                        {todo.text}
                    </p>
                    <small className={styles.todoDate}>
                        Створено: {formatDate(todo.createdAt)}
                        {todo.updatedAt !== todo.createdAt && (
                            <span className={styles.updated}>
                • Оновлено: {formatDate(todo.updatedAt)}
              </span>
                        )}
                    </small>
                </div>
            </div>

            <div className={styles.actions}>
                <button
                    className={`${styles.actionBtn} ${styles.toggleBtn}`}
                    onClick={handleToggle}
                    title={todo.completed ? 'Позначити як активне' : 'Позначити як виконане'}
                >
                    {todo.completed ? '↩️' : '✅'}
                </button>

                <button
                    className={`${styles.actionBtn} ${styles.deleteBtn}`}
                    onClick={handleDelete}
                    disabled={isDeleting}
                    title="Видалити завдання"
                >
                    {isDeleting ? '⏳' : '🗑️'}
                </button>
            </div>
        </div>
    );
};

export default TodoItem;