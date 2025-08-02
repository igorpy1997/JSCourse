import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useDispatch } from 'react-redux';
import { updateTodoStart } from '../../store/slices/todoSlice';
import styles from './TodoItem.module.scss';

const TodoItem = ({ todo, onToggle, onDelete, index }) => {
    const { isDark } = useTheme();
    const dispatch = useDispatch();
    const [isDeleting, setIsDeleting] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);

    const handleToggle = () => {
        onToggle(todo._id, !todo.completed);
    };

    const handleDelete = async () => {
        if (window.confirm('Ви впевнені, що хочете видалити це завдання?')) {
            setIsDeleting(true);
            try {
                await onDelete(todo._id);
            } catch (error) {
                setIsDeleting(false);
                console.error('Error deleting todo:', error);
            }
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
        setEditText(todo.text);
    };

    const handleSaveEdit = () => {
        const newText = editText.trim();
        if (newText.length === 0) {
            alert('Текст не може бути пустим!');
            return;
        }
        if (newText.length < 5) {
            alert('Мінімальна довжина - 5 символів!');
            return;
        }

        dispatch(updateTodoStart({
            id: todo._id,
            updates: { text: newText }
        }));
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditText(todo.text);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSaveEdit();
        } else if (e.key === 'Escape') {
            handleCancelEdit();
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
        ${isEditing ? styles.editing : ''}
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
                        disabled={isEditing}
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
                    {isEditing ? (
                        <div className={styles.editContainer}>
                            <input
                                type="text"
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                onKeyDown={handleKeyPress}
                                className={styles.editInput}
                                maxLength={500}
                                autoFocus
                            />
                            <div className={styles.editButtons}>
                                <button
                                    onClick={handleSaveEdit}
                                    className={`${styles.editBtn} ${styles.saveBtn}`}
                                    disabled={editText.trim().length < 5}
                                >
                                    ✅
                                </button>
                                <button
                                    onClick={handleCancelEdit}
                                    className={`${styles.editBtn} ${styles.cancelBtn}`}
                                >
                                    ❌
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
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
                        </>
                    )}
                </div>
            </div>

            {!isEditing && (
                <div className={styles.actions}>
                    <button
                        className={`${styles.actionBtn} ${styles.editActionBtn}`}
                        onClick={handleEdit}
                        disabled={todo.completed}
                        title="Редагувати завдання"
                    >
                        ✏️
                    </button>

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
            )}
        </div>
    );
};

export default TodoItem;