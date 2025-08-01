import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
    Box,
    TextField,
    Button,
    Typography,
    LinearProgress,
    Alert,
} from '@mui/material';
import { Add as AddIcon, Schedule as ScheduleIcon } from '@mui/icons-material';

// Валидация с Yup
const todoValidationSchema = Yup.object({
    todoText: Yup.string()
        .min(5, 'Мінімальна довжина - 5 символів')
        .max(500, 'Максимальна довжина - 500 символів')
        .required('Поле обов\'язкове для заповнення')
        .trim()
});

const TodoForm = ({ onAddTodo, loading }) => {
    const handleSubmit = async (values, { resetForm, setSubmitting }) => {
        try {
            const success = await onAddTodo(values.todoText.trim());
            if (success) {
                resetForm();
            }
        } catch (error) {
            console.error('Error submitting todo:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Box sx={{ mb: 3 }}>
            <Formik
                initialValues={{ todoText: '' }}
                validationSchema={todoValidationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, errors, touched, values, handleChange, handleBlur }) => (
                    <Form>
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                            <TextField
                                name="todoText"
                                label="Додати нове завдання"
                                placeholder="Введіть текст завдання (мін. 5 символів)..."
                                value={values.todoText}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.todoText && Boolean(errors.todoText)}
                                helperText={touched.todoText && errors.todoText}
                                disabled={loading || isSubmitting}
                                fullWidth
                                multiline
                                maxRows={3}
                                variant="outlined"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                    }
                                }}
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                disabled={loading || isSubmitting || !values.todoText.trim()}
                                startIcon={
                                    loading || isSubmitting ?
                                        <ScheduleIcon sx={{ animation: 'spin 1s linear infinite' }} /> :
                                        <AddIcon />
                                }
                                sx={{
                                    minWidth: 120,
                                    height: 56,
                                    borderRadius: 2,
                                    fontWeight: 'bold',
                                    textTransform: 'none',
                                }}
                            >
                                {loading || isSubmitting ? 'Додається...' : 'Додати'}
                            </Button>
                        </Box>

                        {/* Счетчик символов */}
                        <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography
                                variant="caption"
                                color={values.todoText.length < 5 && values.todoText.length > 0 ? 'warning.main' : 'text.secondary'}
                                sx={{ fontWeight: 500 }}
                            >
                                {values.todoText.length}/500 символів
                                {values.todoText.length < 5 && values.todoText.length > 0 &&
                                    ` (ще ${5 - values.todoText.length})`
                                }
                            </Typography>

                            {values.todoText.length >= 450 && (
                                <Typography variant="caption" color="warning.main" sx={{ fontWeight: 500 }}>
                                    Залишилось: {500 - values.todoText.length} символів
                                </Typography>
                            )}
                        </Box>

                        {/* Прогресс бар для длинных операций */}
                        {(loading || isSubmitting) && (
                            <LinearProgress sx={{ mt: 2, borderRadius: 1 }} />
                        )}
                    </Form>
                )}
            </Formik>

            {/* Подсказка для пользователей */}
            <Alert
                severity="info"
                sx={{ mt: 2, borderRadius: 2 }}
                icon={false}
            >
                <Typography variant="body2">
                    <strong>💡 Підказка:</strong> Натисніть Enter + Ctrl для швидкого додавання завдання
                </Typography>
            </Alert>
        </Box>
    );
};

export default TodoForm;