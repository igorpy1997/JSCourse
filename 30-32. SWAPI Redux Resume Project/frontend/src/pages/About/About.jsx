import React from 'react';
import {
    Box,
    Typography,
    Paper,
    Grid,
    Card,
    CardContent,
    Chip,
    Avatar,
    LinearProgress,
    Divider,
    Button,
    IconButton,
} from '@mui/material';
import {
    Timeline,
    TimelineItem,
    TimelineSeparator,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineOppositeContent,
} from '@mui/lab';
import {
    Code as CodeIcon,
    Work as WorkIcon,
    School as SchoolIcon,
    EmojiEvents as AwardIcon,
    Person as PersonIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
    LinkedIn as LinkedInIcon,
    GitHub as GitHubIcon,
    Download as DownloadIcon,
    Psychology as PsychologyIcon,
    Build as BuildIcon,
    Language as LanguageIcon,
    Favorite as FavoriteIcon,
} from '@mui/icons-material';

const About = () => {
    const skills = [
        {
            category: 'Frontend Development',
            icon: <CodeIcon />,
            color: 'primary',
            technologies: [
                { name: 'JavaScript', level: 90 },
                { name: 'TypeScript', level: 85 },
                { name: 'React', level: 95 },
                { name: 'Vue.js', level: 80 },
                { name: 'Next.js', level: 85 },
                { name: 'HTML5/CSS3', level: 95 },
                { name: 'SCSS/Sass', level: 90 },
                { name: 'Material-UI', level: 90 },
            ]
        },
        {
            category: 'Backend & Database',
            icon: <BuildIcon />,
            color: 'secondary',
            technologies: [
                { name: 'Node.js', level: 85 },
                { name: 'Express.js', level: 90 },
                { name: 'MongoDB', level: 80 },
                { name: 'PostgreSQL', level: 75 },
                { name: 'REST API', level: 90 },
                { name: 'GraphQL', level: 70 },
            ]
        },
        {
            category: 'Tools & Technologies',
            icon: <PsychologyIcon />,
            color: 'success',
            technologies: [
                { name: 'Git/GitHub', level: 95 },
                { name: 'Webpack', level: 85 },
                { name: 'Docker', level: 75 },
                { name: 'Jest/Testing', level: 80 },
                { name: 'Redux/Saga', level: 90 },
                { name: 'Figma', level: 85 },
            ]
        }
    ];

    const experiences = [
        {
            period: '2023 - Зараз',
            position: 'Senior Frontend Developer',
            company: 'TechFlow Solutions',
            location: 'Katowice, Poland',
            description: 'Розробка та підтримка великих React додатків, впровадження нових архітектурних рішень та менторство junior розробників.',
            achievements: [
                'Покращив продуктивність додатку на 40% через оптимізацію Bundle Size',
                'Впровадив TypeScript у legacy проект з 200k+ рядків коду',
                'Створив Design System з 50+ reusable компонентів',
                'Менторство 3 junior розробників'
            ],
            technologies: ['React', 'TypeScript', 'Redux Toolkit', 'Material-UI', 'Jest']
        },
        {
            period: '2022 - 2023',
            position: 'Frontend Developer',
            company: 'Digital Innovations',
            location: 'Warsaw, Poland',
            description: 'Розробка SPA додатків для e-commerce та fintech сфери з фокусом на UX та performance.',
            achievements: [
                'Створив responsive дизайн для 5+ проектів',
                'Інтегрував платіжні системи (Stripe, PayPal)',
                'Впровадив automated testing з coverage 85%+',
                'Оптимізував SEO для покращення Core Web Vitals'
            ],
            technologies: ['React', 'Next.js', 'SCSS', 'Redux', 'Node.js']
        },
        {
            period: '2021 - 2022',
            position: 'Junior Frontend Developer',
            company: 'StartUp Hub',
            location: 'Remote',
            description: 'Перші кроки в комерційній розробці, робота з MVP продуктами та стартапами.',
            achievements: [
                'Розробив 10+ landing pages з конверсією 12%+',
                'Освоїв React ecosystem та сучасні development tools',
                'Працював в Agile команді з 8 розробників',
                'Створив документацію для onboarding нових розробників'
            ],
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Git']
        }
    ];

    const education = [
        {
            period: '2019 - 2023',
            degree: 'Бакалавр Комп\'ютерних Наук',
            institution: 'Технічний Університет Катовиць',
            location: 'Katowice, Poland',
            specialization: 'Software Engineering & Web Development',
            gpa: '4.2/5.0',
            projects: [
                'Дипломний проект: E-commerce платформа з мікросервісною архітектурою',
                'Hackathon: 1-е місце в розробці AI-чат бота за 48 годин',
                'Open Source: Contributor у популярній React бібліотеці'
            ]
        }
    ];

    const languages = [
        { name: 'Українська', level: 'Рідна', progress: 100 },
        { name: 'English', level: 'Advanced (C1)', progress: 90 },
        { name: 'Polski', level: 'Intermediate (B2)', progress: 75 },
        { name: 'Русский', level: 'Native', progress: 100 },
    ];

    const interests = [
        { name: 'Open Source', icon: '🚀', description: 'Contributor у GitHub проектах' },
        { name: 'Tech Blogging', icon: '✍️', description: 'Пишу статті про веб-розробку' },
        { name: 'Photography', icon: '📸', description: 'Пейзажна та вулична фотографія' },
        { name: 'Travel', icon: '✈️', description: 'Відвідав 15+ країн Європи' },
        { name: 'Gaming', icon: '🎮', description: 'Стратегії та інді-ігри' },
        { name: 'Fitness', icon: '💪', description: 'Регулярні тренування та біг' },
    ];

    return (
        <Box>
            {/* Header Section */}
            <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} md={8}>
                        <Box sx={{ color: 'white' }}>
                            <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
                                Ігор Петренко
                            </Typography>
                            <Typography variant="h5" sx={{ mb: 2, opacity: 0.9 }}>
                                Senior Frontend Developer
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6, fontSize: '1.1rem' }}>
                                Пристрасний розробник з 3+ роками досвіду у створенні сучасних веб-додатків.
                                Спеціалізуюся на React екосистемі та створенні вражаючих користувацьких інтерфейсів.
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    startIcon={<DownloadIcon />}
                                    sx={{ textTransform: 'none', fontWeight: 600 }}
                                >
                                    Завантажити CV
                                </Button>
                                <Button
                                    variant="outlined"
                                    sx={{ color: 'white', borderColor: 'white', textTransform: 'none' }}
                                    startIcon={<EmailIcon />}
                                >
                                    Зв'язатися
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Avatar
                                sx={{
                                    width: 200,
                                    height: 200,
                                    mx: 'auto',
                                    mb: 2,
                                    border: '4px solid white',
                                    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                                }}
                            >
                                <PersonIcon sx={{ fontSize: 100 }} />
                            </Avatar>
                            <Typography variant="body2" sx={{ color: 'white', opacity: 0.8 }}>
                                📍 Katowice, Poland
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>

            <Grid container spacing={4}>
                {/* Skills Section */}
                <Grid item xs={12}>
                    <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CodeIcon color="primary" />
                        Технічні навички
                    </Typography>
                    <Grid container spacing={3}>
                        {skills.map((skillGroup, index) => (
                            <Grid item xs={12} md={4} key={index}>
                                <Card elevation={2} sx={{ height: '100%' }}>
                                    <CardContent>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                            <Avatar sx={{ bgcolor: `${skillGroup.color}.main`, mr: 2 }}>
                                                {skillGroup.icon}
                                            </Avatar>
                                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                {skillGroup.category}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                            {skillGroup.technologies.map((tech, techIndex) => (
                                                <Box key={techIndex}>
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                            {tech.name}
                                                        </Typography>
                                                        <Typography variant="caption" color="text.secondary">
                                                            {tech.level}%
                                                        </Typography>
                                                    </Box>
                                                    <LinearProgress
                                                        variant="determinate"
                                                        value={tech.level}
                                                        color={skillGroup.color}
                                                        sx={{ height: 6, borderRadius: 3 }}
                                                    />
                                                </Box>
                                            ))}
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>

                {/* Experience Section */}
                <Grid item xs={12}>
                    <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <WorkIcon color="primary" />
                        Досвід роботи
                    </Typography>
                    <Timeline position="alternate">
                        {experiences.map((exp, index) => (
                            <TimelineItem key={index}>
                                <TimelineOppositeContent sx={{ m: 'auto 0' }} variant="body2" color="text.secondary">
                                    <Chip label={exp.period} color="primary" />
                                    <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                                        📍 {exp.location}
                                    </Typography>
                                </TimelineOppositeContent>
                                <TimelineSeparator>
                                    <TimelineConnector />
                                    <TimelineDot color="primary" variant="filled">
                                        <WorkIcon />
                                    </TimelineDot>
                                    <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent sx={{ py: '12px', px: 2 }}>
                                    <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                                            {exp.position}
                                        </Typography>
                                        <Typography variant="subtitle1" color="primary" sx={{ mb: 2, fontWeight: 500 }}>
                                            {exp.company}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
                                            {exp.description}
                                        </Typography>
                                        <Box sx={{ mb: 2 }}>
                                            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                                                Основні досягнення:
                                            </Typography>
                                            {exp.achievements.map((achievement, achIndex) => (
                                                <Typography key={achIndex} variant="body2" sx={{ mb: 0.5, display: 'flex', alignItems: 'flex-start' }}>
                                                    <span style={{ marginRight: 8, color: '#4caf50' }}>✓</span>
                                                    {achievement}
                                                </Typography>
                                            ))}
                                        </Box>
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {exp.technologies.map((tech, techIndex) => (
                                                <Chip key={techIndex} label={tech} size="small" variant="outlined" />
                                            ))}
                                        </Box>
                                    </Paper>
                                </TimelineContent>
                            </TimelineItem>
                        ))}
                    </Timeline>
                </Grid>

                {/* Education & Languages */}
                <Grid item xs={12} md={6}>
                    <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <SchoolIcon color="primary" />
                        Освіта
                    </Typography>
                    {education.map((edu, index) => (
                        <Card key={index} elevation={2} sx={{ mb: 2 }}>
                            <CardContent>
                                <Chip label={edu.period} color="secondary" sx={{ mb: 2 }} />
                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                    {edu.degree}
                                </Typography>
                                <Typography variant="subtitle1" color="primary" sx={{ mb: 1, fontWeight: 500 }}>
                                    {edu.institution}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                    📍 {edu.location} • GPA: {edu.gpa}
                                </Typography>
                                <Typography variant="body2" sx={{ mb: 2, fontStyle: 'italic' }}>
                                    {edu.specialization}
                                </Typography>
                                <Box>
                                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                                        Ключові проекти:
                                    </Typography>
                                    {edu.projects.map((project, projIndex) => (
                                        <Typography key={projIndex} variant="body2" sx={{ mb: 0.5, display: 'flex', alignItems: 'flex-start' }}>
                                            <span style={{ marginRight: 8, color: '#ff9800' }}>🏆</span>
                                            {project}
                                        </Typography>
                                    ))}
                                </Box>
                            </CardContent>
                        </Card>
                    ))}
                </Grid>

                <Grid item xs={12} md={6}>
                    <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LanguageIcon color="primary" />
                        Мови
                    </Typography>
                    <Card elevation={2}>
                        <CardContent>
                            {languages.map((lang, index) => (
                                <Box key={index} sx={{ mb: index === languages.length - 1 ? 0 : 3 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                            {lang.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {lang.level}
                                        </Typography>
                                    </Box>
                                    <LinearProgress
                                        variant="determinate"
                                        value={lang.progress}
                                        color="secondary"
                                        sx={{ height: 8, borderRadius: 4 }}
                                    />
                                </Box>
                            ))}
                        </CardContent>
                    </Card>

                    <Typography variant="h5" sx={{ mt: 4, mb: 2, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <FavoriteIcon color="primary" />
                        Інтереси
                    </Typography>
                    <Grid container spacing={2}>
                        {interests.map((interest, index) => (
                            <Grid item xs={6} key={index}>
                                <Card elevation={1} sx={{ textAlign: 'center', py: 2 }}>
                                    <Typography variant="h4" sx={{ mb: 1 }}>
                                        {interest.icon}
                                    </Typography>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                                        {interest.name}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {interest.description}
                                    </Typography>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>

            {/* Fun Facts */}
            <Box sx={{ mt: 4 }}>
                <Paper elevation={2} sx={{ p: 3, borderRadius: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                    <Typography variant="h5" sx={{ color: 'white', fontWeight: 700, mb: 2, textAlign: 'center' }}>
                        🎯 Цікаві факти
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={3}>
                            <Box sx={{ textAlign: 'center', color: 'white' }}>
                                <Typography variant="h3" sx={{ fontWeight: 'bold' }}>50K+</Typography>
                                <Typography variant="body2">Рядків коду написано</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Box sx={{ textAlign: 'center', color: 'white' }}>
                                <Typography variant="h3" sx={{ fontWeight: 'bold' }}>25+</Typography>
                                <Typography variant="body2">Завершених проектів</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Box sx={{ textAlign: 'center', color: 'white' }}>
                                <Typography variant="h3" sx={{ fontWeight: 'bold' }}>500+</Typography>
                                <Typography variant="body2">Чашок кави випито</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Box sx={{ textAlign: 'center', color: 'white' }}>
                                <Typography variant="h3" sx={{ fontWeight: 'bold' }}>15+</Typography>
                                <Typography variant="body2">Технологій освоєно</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </Box>
    );
};

export default About;