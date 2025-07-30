import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useTheme } from '../../context/ThemeContext';
import styles from './TodoForm.module.scss';

// Валидация с Yup
const todoValidationSchema = Yup.object({
    todoText: Yup.string()
        .min(5, 'Мінімальна довжина - 5 символів')
        .max(500, 'Максимальна довжина - 500 символів')
        .required('Поле обов\'язкове для заповнення')
        .trim()
});

const TodoForm = ({ onAddTodo, loading }) => {
    const { isDark } = useTheme();

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
        <div className={isDark ? styles.dark : styles.light}>
            <Formik
                initialValues={{ todoText: '' }}
                validationSchema={todoValidationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, errors, touched, values }) => (
                    <Form className={styles.todoForm}>
                        <div className={styles.inputGroup}>
                            <Field
                                name="todoText"
                                type="text"
                                placeholder="Додати нове завдання (мін. 5 символів)..."
                                className={`${styles.todoInput} ${
                                    errors.todoText && touched.todoText ? styles.errorInput : ''
                                }`}
                                disabled={loading || isSubmitting}
                            />

                            <button
                                type="submit"
                                className={styles.submitBtn}
                                disabled={loading || isSubmitting || !values.todoText.trim()}
                            >
                                {loading || isSubmitting ? (
                                    <span className={styles.spinner}>⏳</span>
                                ) : (
                                    '➕ Додати'
                                )}
                            </button>
                        </div>

                        <ErrorMessage
                            name="todoText"
                            component="div"
                            className={styles.errorMessage}
                        />

                        {/* Показываем счетчик символов */}
                        <div className={styles.charCounter}>
              <span className={values.todoText.length < 5 ? styles.warningText : styles.normalText}>
                {values.todoText.length}/500 символів
                  {values.todoText.length < 5 && values.todoText.length > 0 &&
                      ` (ще ${5 - values.todoText.length})`
                  }
              </span>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default TodoForm;