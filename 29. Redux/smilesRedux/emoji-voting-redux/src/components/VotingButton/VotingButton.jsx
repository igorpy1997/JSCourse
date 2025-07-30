import React from 'react';
import styles from './VotingButton.module.scss';

const VotingButton = ({ emoji, votes, onVote }) => {
    return (
        <div className={styles.emojiItem} onClick={onVote}>
            <span className={styles.emoji}>{emoji}</span>
            <span className={styles.votes}>{votes}</span>
        </div>
    );
};

export default VotingButton;