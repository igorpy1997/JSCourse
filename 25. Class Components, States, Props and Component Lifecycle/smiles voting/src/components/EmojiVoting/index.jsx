import React, {Component} from 'react';
import styles from './EmojiVoting.module.scss';

class EmojiVoting extends Component {
    constructor(props) {
        super(props);

        const savedEmojis = localStorage.getItem('emojiVotes');
        const defaultEmojis = [
            {id: 1, emoji: '😛', votes: 0},
            {id: 2, emoji: '😊', votes: 0},
            {id: 3, emoji: '😎', votes: 0},
            {id: 4, emoji: '🤩', votes: 0},
            {id: 5, emoji: '😍', votes: 0}
        ];

        this.state = {
            emojis: savedEmojis ? JSON.parse(savedEmojis) : defaultEmojis,
            showResults: false
        };
    }

    handleVote = (emojiId) => {
        const updatedEmojis = this.state.emojis.map(emoji => {
            if (emoji.id === emojiId) {
                return {...emoji, votes: emoji.votes + 1};
            }
            return emoji;
        });

        this.setState({emojis: updatedEmojis});
        localStorage.setItem('emojiVotes', JSON.stringify(updatedEmojis));
    }

    toggleResults = () => {
        this.setState({ showResults: !this.state.showResults });
    }

    getWinner = () => {
        return this.state.emojis.reduce((winner, current) => {
            return current.votes > winner.votes ? current : winner;
        });
    }

    render() {
        const winner = this.getWinner();

        return (
            <div className={styles.container}>
                <h1 className={styles.title}>Голосування за найкращий смайлик</h1>
                <div className={styles.emojiContainer}>
                    {this.state.emojis.map(emoji => (
                        <div
                            key={emoji.id}
                            className={styles.emojiItem}
                            onClick={() => this.handleVote(emoji.id)}
                        >
                            <span className={styles.emoji}>{emoji.emoji}</span>
                            <span className={styles.votes}>{emoji.votes}</span>
                        </div>
                    ))}
                </div>

                <button className={styles.showButton} onClick={this.toggleResults}>
                    {this.state.showResults ? 'Hide Results' : 'Show Results'}
                </button>

                {this.state.showResults && (
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
            </div>
        );
    }
}

export default EmojiVoting;