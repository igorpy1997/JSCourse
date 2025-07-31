import React from 'react';
import { useSelector } from 'react-redux';
import { selectEmojis } from '../../store/slices/emojiSlice';
import VotingButton from '../VotingButton/VotingButton';
import ResultsBlock from '../ResultsBlock/ResultsBlock';
import ClearButton from '../ClearButton/ClearButton';
import styles from './EmojiVoting.module.scss';

const EmojiVoting = () => {
    const emojis = useSelector(selectEmojis);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Голосування за найкращий смайлик</h1>

            <div className={styles.emojiContainer}>
                {emojis.map(emoji => (
                    <VotingButton
                        key={emoji.id}
                        emoji={emoji}
                    />
                ))}
            </div>

            <div className={styles.buttonsContainer}>
                <ResultsBlock />
                <ClearButton />
            </div>
        </div>
    );
};

export default EmojiVoting;