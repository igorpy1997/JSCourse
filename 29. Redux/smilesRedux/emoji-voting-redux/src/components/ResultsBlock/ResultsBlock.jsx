import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectShowResults,
    selectWinner,
    toggleResults
} from '../../store/slices/emojiSlice';
import styles from './ResultsBlock.module.scss';

const ResultsBlock = () => {
    const dispatch = useDispatch();
    const showResults = useSelector(selectShowResults);
    const winner = useSelector(selectWinner);

    const handleToggleResults = () => {
        dispatch(toggleResults());
    };

    return (
        <>
            <button className={styles.showButton} onClick={handleToggleResults}>
                {showResults ? 'Hide Results' : 'Show Results'}
            </button>

            {showResults && (
                <div className={styles.resultsContainer}>
                    <h2 className={styles.resultsTitle}>Результати голосування:</h2>
                    <div className={styles.winnerContainer}>
                        <h3 className={styles.winnerLabel}>Переможець:</h3>
                        <div className={styles.winner}>
                            <span className={styles.winnerEmoji}>{winner.emoji}</span>
                            <p className={styles.winnerVotes}>Кількість голосів: {winner.votes}</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ResultsBlock;