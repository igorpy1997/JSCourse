import React from 'react';
import {
    Box,
    Typography,
    CircularProgress,
    Paper,
    Backdrop,
} from '@mui/material';
import {
    Assignment as AssignmentIcon,
    CheckCircleOutline as CheckCircleOutlineIcon,
} from '@mui/icons-material';
import TodoItem from '../TodoItem/TodoItem';

const TodoList = ({ todos, onToggleTodo, onDeleteTodo, loading }) => {
    if (loading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    py: 6,
                    textAlign: 'center',
                }}
            >
                <CircularProgress size={60} thickness={4} sx={{ mb: 2 }} />
                <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500 }}>
                    Завантаження завдань...
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Зачекайте, будь ласка
                </Typography>
            </Box>
        );
    }

    if (todos.length === 0) {
        return (
            <Paper
                sx={{
                    p: 6,
                    textAlign: 'center',
                    bgcolor: 'background.paper',
                    borderRadius: 3,
                    border: '2px dashed',
                    borderColor: 'divider',
                }}
            >
                <AssignmentIcon
                    sx={{
                        fontSize: 80,
                        color: 'text.secondary',
                        mb: 2,
                        opacity: 0.6,
                    }}
                />
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 600,
                        mb: 1,
                        color: 'text.primary',
                    }}
                >
                    Немає завдань
                </Typography>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                        mb: 2,
                        maxWidth: 400,
                        mx: 'auto',
                        lineHeight: 1.6,
                    }}
                >
                    Поки що у вас немає жодного завдання. Додайте своє перше завдання, використовуючи форму вище.
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        fontStyle: 'italic',
                        opacity: 0.8,
                    }}
                >
                    💡 Організуйте свій день ефективно!
                </Typography>
            </Paper>
        );
    }

    return (
        <Box sx={{ mt: 3 }}>
            {/* Заголовок списка */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <CheckCircleOutlineIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Список завдань ({todos.length})
                </Typography>
            </Box>

            {/* Список задач */}
            <Box>
                {todos.map((todo, index) => (
                    <TodoItem
                        key={todo._id}
                        todo={todo}
                        onToggle={onToggleTodo}
                        onDelete={onDeleteTodo}
                        index={index}
                    />
                ))}
            </Box>

            {/* Подсказка для больших списков */}
            {todos.length > 10 && (
                <Box
                    sx={{
                        mt: 3,
                        p: 2,
                        bgcolor: 'info.light',
                        color: 'info.contrastText',
                        borderRadius: 2,
                        textAlign: 'center',
                    }}
                >
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        📋 У вас багато завдань! Використовуйте фільтри для зручності
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default TodoList;