import React, { useState, useEffect } from 'react';
import VotingButton from '../VotingButton/VotingButton';
import ResultsBlock from '../ResultsBlock/ResultsBlock';
import styles from './EmojiVoting.module.scss';

const EmojiVoting = () => {
    const defaultEmojis = [
        {id: 1, emoji: '😛', votes: 0},
        {id: 2, emoji: '😊', votes: 0},
        {id: 3, emoji: '😎', votes: 0},
        {id: 4, emoji: '🤩', votes: 0},
        {id: 5, emoji: '😍', votes: 0}
    ];

    const [emojis, setEmojis] = useState(() => {
        const savedEmojis = localStorage.getItem('emojiVotes');
        return savedEmojis ? JSON.parse(savedEmojis) : defaultEmojis;
    });

    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        localStorage.setItem('emojiVotes', JSON.stringify(emojis));
    }, [emojis]);

    const handleVote = (emojiId) => {
        setEmojis(prevEmojis =>
            prevEmojis.map(emoji =>
                emoji.id === emojiId
                    ? { ...emoji, votes: emoji.votes + 1 }
                    : emoji
            )
        );
    };

    const getWinner = () => {
        return emojis.reduce((winner, current) =>
            current.votes > winner.votes ? current : winner
        );
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Голосування за найкращий смайлик</h1>

            <div className={styles.emojiContainer}>
                {emojis.map(emoji => (
                    <VotingButton
                        key={emoji.id}
                        emoji={emoji.emoji}
                        votes={emoji.votes}
                        onVote={() => handleVote(emoji.id)}
                    />
                ))}
            </div>

            <ResultsBlock
                showResults={showResults}
                onToggleResults={() => setShowResults(!showResults)}
                winner={getWinner()}
            />
        </div>
    );
};

export default EmojiVoting;