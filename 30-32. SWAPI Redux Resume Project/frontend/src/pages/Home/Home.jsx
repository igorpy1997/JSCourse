import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Box,
    Typography,
    Paper,
    Chip,
    Button,
    ButtonGroup,
    Alert,
    Snackbar,
    IconButton,
    Divider,
    Grid,
    Card,
    CardContent,
} from '@mui/material';
import {
    Close as CloseIcon,
    DeleteSweep as DeleteSweepIcon,
    FilterList as FilterListIcon,
    TrendingUp as TrendingUpIcon,
    Assignment as AssignmentIcon,
    CheckCircle as CheckCircleIcon,
    Schedule as ScheduleIcon,
} from '@mui/icons-material';

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

const Home = () => {
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

    const filterOptions = [
        { value: 'all', label: 'Всі', icon: <AssignmentIcon /> },
        { value: 'active', label: 'Активні', icon: <ScheduleIcon /> },
        { value: 'completed', label: 'Виконані', icon: <CheckCircleIcon /> },
    ];

    return (
        <Box>
            {/* Заголовок */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography
                    variant="h3"
                    component="h1"
                    sx={{
                        fontWeight: 800,
                        mb: 2,
                        background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    📋 ToDo List
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                    Організуйте свої завдання з Redux-Saga
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    ⚡ Powered by Redux-Saga • 🎨 Material-UI Design
                </Typography>
            </Box>

            {/* Статистика */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={4}>
                    <Card elevation={2}>
                        <CardContent sx={{ textAlign: 'center', py: 2 }}>
                            <AssignmentIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                            <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                                {stats.total}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Всього завдань
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Card elevation={2}>
                        <CardContent sx={{ textAlign: 'center', py: 2 }}>
                            <ScheduleIcon sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
                            <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'warning.main' }}>
                                {stats.active}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Активних
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Card elevation={2}>
                        <CardContent sx={{ textAlign: 'center', py: 2 }}>
                            <CheckCircleIcon sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
                            <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'success.main' }}>
                                {stats.completed}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Виконано
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Основной контент */}
            <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
                {/* Форма добавления */}
                <TodoForm onAddTodo={handleAddTodo} loading={loading} />

                <Divider sx={{ my: 3 }} />

                {/* Фильтры и действия */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <FilterListIcon color="action" />
                        <ButtonGroup variant="outlined" size="small">
                            {filterOptions.map((option) => (
                                <Button
                                    key={option.value}
                                    onClick={() => handleSetFilter(option.value)}
                                    variant={filter === option.value ? 'contained' : 'outlined'}
                                    startIcon={option.icon}
                                    sx={{ textTransform: 'none' }}
                                >
                                    {option.label}
                                </Button>
                            ))}
                        </ButtonGroup>
                    </Box>

                    {stats.completed > 0 && (
                        <Button
                            variant="outlined"
                            color="error"
                            startIcon={<DeleteSweepIcon />}
                            onClick={handleClearCompleted}
                            sx={{ textTransform: 'none' }}
                        >
                            Очистити виконані ({stats.completed})
                        </Button>
                    )}
                </Box>

                {/* Список задач */}
                <TodoList
                    todos={todos}
                    onToggleTodo={handleToggleTodo}
                    onDeleteTodo={handleDeleteTodo}
                    loading={loading}
                />

                {/* Прогресс */}
                {stats.total > 0 && (
                    <Box sx={{ mt: 3, p: 2, bgcolor: 'background.default', borderRadius: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <TrendingUpIcon color="primary" />
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                Прогрес виконання
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            <Chip
                                label={`${Math.round((stats.completed / stats.total) * 100)}% виконано`}
                                color="success"
                                variant="filled"
                            />
                            <Chip
                                label={`${stats.active} активних`}
                                color="warning"
                                variant="outlined"
                            />
                        </Box>
                    </Box>
                )}
            </Paper>

            {/* Snackbar для ошибок */}
            <Snackbar
                open={Boolean(error)}
                autoHideDuration={6000}
                onClose={handleClearError}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleClearError}
                    severity="error"
                    variant="filled"
                    action={
                        <IconButton
                            size="small"
                            color="inherit"
                            onClick={handleClearError}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    }
                >
                    {error}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Home;