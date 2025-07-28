import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import styles from './ThemeToggle.module.scss';

const ThemeToggle = () => {
    const { isDark, toggleTheme } = useTheme();

    return (
        <button
            className={`${styles.toggleButton} ${isDark ? styles.dark : styles.light}`}
            onClick={toggleTheme}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
        >
      <span className={styles.icon}>
        {isDark ? '☀️' : '🌙'}
      </span>
            <span className={styles.text}>
        {isDark ? 'Світла' : 'Темна'}
      </span>
        </button>
    );
};

export default ThemeToggle;