import React from 'react';
import { useDispatch } from 'react-redux';
import { clearResults } from '../../store/slices/emojiSlice';
import styles from './ClearButton.module.scss';

const ClearButton = () => {
    const dispatch = useDispatch();

    const handleClearResults = () => {
        if (window.confirm('Are you sure you want to clear all results?')) {
            dispatch(clearResults());
        }
    };

    return (
        <button className={styles.clearButton} onClick={handleClearResults}>
            Clear Results
        </button>
    );
};

export default ClearButton;