import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import styles from './Contacts.module.scss';

const Contacts = () => {
    const { isDark } = useTheme();

    const contactMethods = [
        {
            icon: '📧',
            title: 'Email',
            value: 'your.email@example.com',
            link: 'mailto:your.email@example.com'
        },
        {
            icon: '📱',
            title: 'Телефон',
            value: '+380 XX XXX XX XX',
            link: 'tel:+380xxxxxxxxx'
        },
        {
            icon: '💬',
            title: 'Telegram',
            value: '@your_username',
            link: 'https://t.me/your_username'
        },
        {
            icon: '💼',
            title: 'LinkedIn',
            value: 'linkedin.com/in/yourprofile',
            link: 'https://linkedin.com/in/yourprofile'
        },
        {
            icon: '🐙',
            title: 'GitHub',
            value: 'github.com/yourusername',
            link: 'https://github.com/yourusername'
        }
    ];

    const workingHours = [
        { day: 'Понеділок - П\'ятниця', time: '9:00 - 18:00' },
        { day: 'Субота', time: '10:00 - 16:00' },
        { day: 'Неділя', time: 'Вихідний' }
    ];

    return (
        <div className={isDark ? styles.dark : styles.light}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Контакти</h1>
                    <p className={styles.subtitle}>
                        Зв'яжіться зі мною будь-яким зручним способом
                    </p>
                </div>

                <div className={styles.content}>
                    <div className={styles.contactsSection}>
                        <h2 className={styles.sectionTitle}>
                            <span className={styles.sectionIcon}>📞</span>
                            Способи зв'язку
                        </h2>

                        <div className={styles.contactGrid}>
                            {contactMethods.map((contact, index) => (
                                <a
                                    key={index}
                                    href={contact.link}
                                    className={styles.contactCard}
                                    target={contact.link.startsWith('http') ? '_blank' : '_self'}
                                    rel={contact.link.startsWith('http') ? 'noopener noreferrer' : ''}
                                >
                                    <div className={styles.contactIcon}>{contact.icon}</div>
                                    <div className={styles.contactInfo}>
                                        <h3 className={styles.contactTitle}>{contact.title}</h3>
                                        <p className={styles.contactValue}>{contact.value}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className={styles.scheduleSection}>
                        <h2 className={styles.sectionTitle}>
                            <span className={styles.sectionIcon}>⏰</span>
                            Графік роботи
                        </h2>

                        <div className={styles.scheduleCard}>
                            {workingHours.map((schedule, index) => (
                                <div key={index} className={styles.scheduleItem}>
                                    <span className={styles.scheduleDay}>{schedule.day}</span>
                                    <span className={styles.scheduleTime}>{schedule.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.locationSection}>
                        <h2 className={styles.sectionTitle}>
                            <span className={styles.sectionIcon}>📍</span>
                            Локація
                        </h2>

                        <div className={styles.locationCard}>
                            <div className={styles.locationInfo}>
                                <h3 className={styles.locationTitle}>Katowice, Poland</h3>
                                <p className={styles.locationDescription}>
                                    Працюю віддалено та готовий до співпраці з командами по всьому світу
                                </p>
                            </div>
                            <div className={styles.locationIcon}>🌍</div>
                        </div>
                    </div>

                    <div className={styles.responseSection}>
                        <div className={styles.responseCard}>
                            <h3 className={styles.responseTitle}>💬 Швидкий відгук</h3>
                            <p className={styles.responseText}>
                                Зазвичай відповідаю протягом <strong>24 годин</strong> у робочі дні.
                                Для термінових питань краще телефонувати або писати в Telegram.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contacts;