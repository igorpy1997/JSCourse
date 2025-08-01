import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
    Box,
    Typography,
    Paper,
    Grid,
    Card,
    CardContent,
    TextField,
    Button,
    Chip,
    Avatar,
    IconButton,
    Snackbar,
    Alert,
    Link,
    Divider,
} from '@mui/material';
import {
    Email as EmailIcon,
    Phone as PhoneIcon,
    LocationOn as LocationIcon,
    LinkedIn as LinkedInIcon,
    GitHub as GitHubIcon,
    Telegram as TelegramIcon,
    WhatsApp as WhatsAppIcon,
    Send as SendIcon,
    AccessTime as AccessTimeIcon,
    Language as LanguageIcon,
    Work as WorkIcon,
    Coffee as CoffeeIcon,
} from '@mui/icons-material';

const Contacts = () => {
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const contactMethods = [
        {
            icon: <EmailIcon />,
            title: 'Email',
            value: 'igor.petrenko.dev@gmail.com',
            link: 'mailto:igor.petrenko.dev@gmail.com',
            color: 'primary',
            description: 'Основний спосіб зв\'язку'
        },
        {
            icon: <PhoneIcon />,
            title: 'Телефон',
            value: '+48 123 456 789',
            link: 'tel:+48123456789',
            color: 'secondary',
            description: 'Дзвінки в робочий час'
        },
        {
            icon: <TelegramIcon />,
            title: 'Telegram',
            value: '@igor_petrenko_dev',
            link: 'https://t.me/igor_petrenko_dev',
            color: 'info',
            description: 'Швидкі повідомлення'
        },
        {
            icon: <LinkedInIcon />,
            title: 'LinkedIn',
            value: 'linkedin.com/in/igor-petrenko-dev',
            link: 'https://linkedin.com/in/igor-petrenko-dev',
            color: 'primary',
            description: 'Професійна мережа'
        },
        {
            icon: <GitHubIcon />,
            title: 'GitHub',
            value: 'github.com/igor-petrenko-dev',
            link: 'https://github.com/igor-petrenko-dev',
            color: 'default',
            description: 'Мої проекти та код'
        },
        {
            icon: <WhatsAppIcon />,
            title: 'WhatsApp',
            value: '+48 123 456 789',
            link: 'https://wa.me/48123456789',
            color: 'success',
            description: 'Месенджер для швидкого зв\'язку'
        }
    ];

    const workingHours = [
        { day: 'Понеділок - П\'ятниця', time: '9:00 - 18:00', available: true },
        { day: 'Субота', time: '10:00 - 16:00', available: true },
        { day: 'Неділя', time: 'Вихідний', available: false }
    ];

    const contactFormSchema = Yup.object({
        name: Yup.string()
            .min(2, 'Мінімум 2 символи')
            .max(50, 'Максимум 50 символів')
            .required('Обов\'язкове поле'),
        email: Yup.string()
            .email('Невірний формат email')
            .required('Обов\'язкове поле'),
        subject: Yup.string()
            .min(5, 'Мінімум 5 символів')
            .max(100, 'Максимум 100 символів')
            .required('Обов\'язкове поле'),
        message: Yup.string()
            .min(10, 'Мінімум 10 символів')
            .max(1000, 'Максимум 1000 символів')
            .required('Обов\'язкове поле')
    });

    const handleFormSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            setSnackbar({
                open: true,
                message: 'Повідомлення успішно відправлено! Дякую за звернення.',
                severity: 'success'
            });
            resetForm();
        } catch (error) {
            setSnackbar({
                open: true,
                message: 'Помилка відправки повідомлення. Спробуйте пізніше.',
                severity: 'error'
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Box>
            {/* Header */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography
                    variant="h3"
                    component="h1"
                    sx={{
                        fontWeight: 800,
                        mb: 2,
                        background: 'linear-gradient(45deg, #2196f3, #21cbf3)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    📞 Контакти
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                    Зв'яжіться зі мною будь-яким зручним способом
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Завжди радий новим можливостям та цікавим проектам!
                </Typography>
            </Box>

            <Grid container spacing={4}>
                {/* Contact Methods */}
                <Grid item xs={12} lg={8}>
                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                        📱 Способи зв'язку
                    </Typography>
                    <Grid container spacing={3}>
                        {contactMethods.map((contact, index) => (
                            <Grid item xs={12} sm={6} key={index}>
                                <Card
                                    elevation={2}
                                    sx={{
                                        height: '100%',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: 4,
                                        },
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => window.open(contact.link, '_blank')}
                                >
                                    <CardContent sx={{ textAlign: 'center', py: 3 }}>
                                        <Avatar
                                            sx={{
                                                bgcolor: `${contact.color}.main`,
                                                width: 56,
                                                height: 56,
                                                mx: 'auto',
                                                mb: 2,
                                            }}
                                        >
                                            {contact.icon}
                                        </Avatar>
                                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                            {contact.title}
                                        </Typography>
                                        <Typography variant="body2" color="primary" sx={{ mb: 1, fontWeight: 500 }}>
                                            {contact.value}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {contact.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    {/* Working Hours */}
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                            <AccessTimeIcon color="primary" />
                            Графік роботи
                        </Typography>
                        <Card elevation={2}>
                            <CardContent>
                                {workingHours.map((schedule, index) => (
                                    <Box key={index} sx={{ mb: index === workingHours.length - 1 ? 0 : 2 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                                {schedule.day}
                                            </Typography>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Typography variant="body2" color="text.secondary">
                                                    {schedule.time}
                                                </Typography>
                                                <Chip
                                                    label={schedule.available ? 'Доступний' : 'Вихідний'}
                                                    size="small"
                                                    color={schedule.available ? 'success' : 'default'}
                                                />
                                            </Box>
                                        </Box>
                                        {index < workingHours.length - 1 && <Divider sx={{ mt: 2 }} />}
                                    </Box>
                                ))}
                            </CardContent>
                        </Card>
                    </Box>

                    {/* Additional Info */}
                    <Box sx={{ mt: 4 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={4}>
                                <Card elevation={1} sx={{ textAlign: 'center', p: 2, bgcolor: 'primary.light', color: 'primary.contrastText' }}>
                                    <LocationIcon sx={{ fontSize: 40, mb: 1 }} />
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        Katowice, Poland
                                    </Typography>
                                    <Typography variant="body2">
                                        Готовий до релокації
                                    </Typography>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Card elevation={1} sx={{ textAlign: 'center', p: 2, bgcolor: 'secondary.light', color: 'secondary.contrastText' }}>
                                    <LanguageIcon sx={{ fontSize: 40, mb: 1 }} />
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        4 мови
                                    </Typography>
                                    <Typography variant="body2">
                                        UA, EN, PL, RU
                                    </Typography>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Card elevation={1} sx={{ textAlign: 'center', p: 2, bgcolor: 'success.light', color: 'success.contrastText' }}>
                                    <WorkIcon sx={{ fontSize: 40, mb: 1 }} />
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        Remote Ready
                                    </Typography>
                                    <Typography variant="body2">
                                        Досвід віддаленої роботи
                                    </Typography>
                                </Card>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>

                {/* Contact Form */}
                <Grid item xs={12} lg={4}>
                    <Paper elevation={3} sx={{ p: 3, borderRadius: 3, height: 'fit-content', position: 'sticky', top: 20 }}>
                        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                            <SendIcon color="primary" />
                            Написати мені
                        </Typography>

                        <Formik
                            initialValues={{
                                name: '',
                                email: '',
                                subject: '',
                                message: ''
                            }}
                            validationSchema={contactFormSchema}
                            onSubmit={handleFormSubmit}
                        >
                            {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
                                <Form>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                        <TextField
                                            name="name"
                                            label="Ваше ім'я"
                                            value={values.name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.name && Boolean(errors.name)}
                                            helperText={touched.name && errors.name}
                                            fullWidth
                                            variant="outlined"
                                        />

                                        <TextField
                                            name="email"
                                            label="Email"
                                            type="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.email && Boolean(errors.email)}
                                            helperText={touched.email && errors.email}
                                            fullWidth
                                            variant="outlined"
                                        />

                                        <TextField
                                            name="subject"
                                            label="Тема повідомлення"
                                            value={values.subject}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.subject && Boolean(errors.subject)}
                                            helperText={touched.subject && errors.subject}
                                            fullWidth
                                            variant="outlined"
                                        />

                                        <TextField
                                            name="message"
                                            label="Повідомлення"
                                            multiline
                                            rows={4}
                                            value={values.message}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.message && Boolean(errors.message)}
                                            helperText={touched.message && errors.message}
                                            fullWidth
                                            variant="outlined"
                                        />

                                        <Button
                                            type="submit"
                                            variant="contained"
                                            size="large"
                                            disabled={isSubmitting}
                                            startIcon={<SendIcon />}
                                            sx={{
                                                textTransform: 'none',
                                                fontWeight: 600,
                                                py: 1.5,
                                            }}
                                        >
                                            {isSubmitting ? 'Відправка...' : 'Відправити повідомлення'}
                                        </Button>
                                    </Box>
                                </Form>
                            )}
                        </Formik>

                        <Box sx={{ mt: 3, p: 2, bgcolor: 'info.light', borderRadius: 2 }}>
                            <Typography variant="body2" sx={{ fontWeight: 500, mb: 1, color: 'info.contrastText' }}>
                                💡 Швидкий відгук
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'info.contrastText', opacity: 0.9 }}>
                                Зазвичай відповідаю протягом 24 годин у робочі дні.
                                Для термінових питань краще писати в Telegram.
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>

            {/* Fun Section */}
            <Box sx={{ mt: 6 }}>
                <Paper
                    elevation={3}
                    sx={{
                        p: 4,
                        borderRadius: 3,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        textAlign: 'center'
                    }}
                >
                    <Typography variant="h5" sx={{ color: 'white', fontWeight: 700, mb: 2 }}>
                        ☕ Завжди готовий до нових викликів!
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'white', mb: 3, opacity: 0.9 }}>
                        Маєте цікавий проект? Потрібна консультація?
                        А може просто хочете поговорити про технології за чашкою кави?
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
                        <Button
                            variant="contained"
                            color="secondary"
                            startIcon={<CoffeeIcon />}
                            href="https://calendly.com/igor-petrenko-dev"
                            target="_blank"
                            sx={{ textTransform: 'none', fontWeight: 600 }}
                        >
                            Запланувати зустріч
                        </Button>
                        <Button
                            variant="outlined"
                            startIcon={<TelegramIcon />}
                            href="https://t.me/igor_petrenko_dev"
                            target="_blank"
                            sx={{
                                color: 'white',
                                borderColor: 'white',
                                textTransform: 'none',
                                '&:hover': {
                                    borderColor: 'white',
                                    backgroundColor: 'rgba(255,255,255,0.1)'
                                }
                            }}
                        >
                            Швидкий чат
                        </Button>
                    </Box>
                </Paper>
            </Box>

            {/* Snackbar */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    severity={snackbar.severity}
                    variant="filled"
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Contacts;