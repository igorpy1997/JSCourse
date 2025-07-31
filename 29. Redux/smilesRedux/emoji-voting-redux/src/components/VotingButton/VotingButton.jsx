import React from 'react';
import { useDispatch } from 'react-redux';
import { voteForEmoji } from '../../store/slices/emojiSlice';
import styles from './VotingButton.module.scss';

const VotingButton = ({ emoji }) => {
    const dispatch = useDispatch();

    const handleVote = () => {
        dispatch(voteForEmoji(emoji.id));
    };

    return (
        <div className={styles.emojiItem} onClick={handleVote}>
            <span className={styles.emoji}>{emoji.emoji}</span>
            <span className={styles.votes}>{emoji.votes}</span>
        </div>
    );
};

export default VotingButton;