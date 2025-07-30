import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import styles from './Header.module.scss';

const Header = () => {
    const { isDark } = useTheme();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <header className={isDark ? styles.dark : styles.light}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <h2 className={styles.logoText}>ToDo SPA</h2>
                </div>

                <nav className={styles.navigation}>
                    <Link
                        to="/"
                        className={`${styles.navLink} ${isActive('/') ? styles.active : ''}`}
                    >
                        Головна
                    </Link>
                    <Link
                        to="/contacts"
                        className={`${styles.navLink} ${isActive('/contacts') ? styles.active : ''}`}
                    >
                        Контакти
                    </Link>
                    <Link
                        to="/about"
                        className={`${styles.navLink} ${isActive('/about') ? styles.active : ''}`}
                    >
                        Про мене
                    </Link>
                </nav>

                <ThemeToggle />
            </div>
        </header>
    );
};

export default Header;