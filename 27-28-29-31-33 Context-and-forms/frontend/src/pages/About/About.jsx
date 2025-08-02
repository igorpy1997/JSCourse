import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import styles from './About.module.scss';

const About = () => {
    const { isDark } = useTheme();

    const skills = [
        {
            category: 'Frontend',
            icon: '🎨',
            technologies: ['JavaScript', 'React', 'Vue.js', 'HTML5', 'CSS3', 'SCSS', 'TypeScript']
        },
        {
            category: 'Backend',
            icon: '⚙️',
            technologies: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'REST API', 'GraphQL']
        },
        {
            category: 'Tools & Other',
            icon: '🛠️',
            technologies: ['Git', 'Webpack', 'Vite', 'Docker', 'AWS', 'Figma', 'Jest']
        }
    ];

    const experiences = [
        {
            period: '2023 - Зараз',
            position: 'Frontend Developer',
            company: 'Tech Company',
            description: 'Розробка SPA додатків на React, оптимізація продуктивності, робота з командою',
            achievements: ['Покращив швидкість завантаження на 40%', 'Впровадив нові UI компоненти', 'Менторство junior розробників']
        },
        {
            period: '2022 - 2023',
            position: 'Junior Developer',
            company: 'StartUp Inc.',
            description: 'Перші кроки в комерційній розробці, вивчення best practices',
            achievements: ['Створив 15+ компонентів', 'Освоїв TypeScript', 'Участь у code review']
        }
    ];

    const education = [
        {
            period: '2020 - 2024',
            institution: 'Технічний Університет',
            degree: 'Бакалавр з Комп\'ютерних Наук',
            details: 'Спеціалізація: Веб-розробка та програмна інженерія'
        }
    ];

    const hobbies = [
        { icon: '🏃‍♂️', name: 'Біг', description: 'Ранкові пробіжки для підтримки форми' },
        { icon: '📚', name: 'Читання', description: 'Технічна література та фантастика' },
        { icon: '🎮', name: 'Ігри', description: 'Стратегії та логічні головоломки' },
        { icon: '📷', name: 'Фотографія', description: 'Пейзажна та вулична фотографія' }
    ];

    return (
        <div className={isDark ? styles.dark : styles.light}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.avatar}>👨‍💻</div>
                    <h1 className={styles.title}>Про мене</h1>
                    <p className={styles.subtitle}>
                        Привіт! Я Frontend розробник з пристрастю до створення сучасних веб-додатків
                    </p>
                </div>

                <div className={styles.content}>
                    <section className={styles.introSection}>
                        <div className={styles.card}>
                            <h2 className={styles.sectionTitle}>
                                <span className={styles.sectionIcon}>👋</span>
                                Знайомство
                            </h2>
                            <p className={styles.introText}>
                                Мене звати <strong>Ігор</strong>, і я захоплююся веб-розробкою вже більше 3 років.
                                Спеціалізуюся на Frontend розробці з використанням React, але також маю досвід роботи з Backend технологіями.
                            </p>
                            <p className={styles.introText}>
                                Моя мета - створювати якісні, доступні та продуктивні веб-додатки, які покращують користувацький досвід.
                                Завжди слідкую за новими тенденціями в галузі та постійно навчаюся.
                            </p>
                        </div>
                    </section>

                    <section className={styles.skillsSection}>
                        <h2 className={styles.sectionTitle}>
                            <span className={styles.sectionIcon}>💻</span>
                            Навички
                        </h2>
                        <div className={styles.skillsGrid}>
                            {skills.map((skillGroup, index) => (
                                <div key={index} className={styles.skillCard}>
                                    <div className={styles.skillHeader}>
                                        <span className={styles.skillIcon}>{skillGroup.icon}</span>
                                        <h3 className={styles.skillCategory}>{skillGroup.category}</h3>
                                    </div>
                                    <div className={styles.technologies}>
                                        {skillGroup.technologies.map((tech, techIndex) => (
                                            <span key={techIndex} className={styles.techBadge}>{tech}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className={styles.experienceSection}>
                        <h2 className={styles.sectionTitle}>
                            <span className={styles.sectionIcon}>💼</span>
                            Досвід роботи
                        </h2>
                        <div className={styles.timeline}>
                            {experiences.map((exp, index) => (
                                <div key={index} className={styles.timelineItem}>
                                    <div className={styles.timelineDot}></div>
                                    <div className={styles.timelineContent}>
                                        <div className={styles.timelinePeriod}>{exp.period}</div>
                                        <h3 className={styles.timelineTitle}>{exp.position}</h3>
                                        <h4 className={styles.timelineCompany}>{exp.company}</h4>
                                        <p className={styles.timelineDescription}>{exp.description}</p>
                                        <ul className={styles.achievementsList}>
                                            {exp.achievements.map((achievement, achIndex) => (
                                                <li key={achIndex} className={styles.achievement}>{achievement}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className={styles.educationSection}>
                        <h2 className={styles.sectionTitle}>
                            <span className={styles.sectionIcon}>🎓</span>
                            Освіта
                        </h2>
                        {education.map((edu, index) => (
                            <div key={index} className={styles.educationCard}>
                                <div className={styles.educationPeriod}>{edu.period}</div>
                                <h3 className={styles.educationDegree}>{edu.degree}</h3>
                                <h4 className={styles.educationInstitution}>{edu.institution}</h4>
                                <p className={styles.educationDetails}>{edu.details}</p>
                            </div>
                        ))}
                    </section>

                    <section className={styles.hobbiesSection}>
                        <h2 className={styles.sectionTitle}>
                            <span className={styles.sectionIcon}>🎯</span>
                            Хобі та інтереси
                        </h2>
                        <div className={styles.hobbiesGrid}>
                            {hobbies.map((hobby, index) => (
                                <div key={index} className={styles.hobbyCard}>
                                    <div className={styles.hobbyIcon}>{hobby.icon}</div>
                                    <h3 className={styles.hobbyName}>{hobby.name}</h3>
                                    <p className={styles.hobbyDescription}>{hobby.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className={styles.factSection}>
                        <div className={styles.factCard}>
                            <h2 className={styles.factTitle}>🚀 Цікавий факт</h2>
                            <p className={styles.factText}>
                                За останній рік написав понад <strong>50,000 рядків коду</strong>,
                                випив близько <strong>365 чашок кави</strong> ☕ та прочитав
                                <strong>12 технічних книг</strong> 📚
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default About;