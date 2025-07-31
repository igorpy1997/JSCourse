import { createSlice } from '@reduxjs/toolkit';

const defaultEmojis = [
    { id: 1, emoji: '😛', votes: 0 },
    { id: 2, emoji: '😊', votes: 0 },
    { id: 3, emoji: '😎', votes: 0 },
    { id: 4, emoji: '🤩', votes: 0 },
    { id: 5, emoji: '😍', votes: 0 }
];

// Загружаем данные из localStorage
const loadFromLocalStorage = () => {
    try {
        const saved = localStorage.getItem('emojiVotes');
        return saved ? JSON.parse(saved) : defaultEmojis;
    } catch (error) {
        return defaultEmojis;
    }
};

// Сохраняем данные в localStorage
const saveToLocalStorage = (emojis) => {
    try {
        localStorage.setItem('emojiVotes', JSON.stringify(emojis));
    } catch (error) {
        console.error('Failed to save to localStorage:', error);
    }
};

const emojiSlice = createSlice({
    name: 'emoji',
    initialState: {
        emojis: loadFromLocalStorage(),
        showResults: false,
    },
    reducers: {
        voteForEmoji: (state, action) => {
            const emojiId = action.payload;
            const emoji = state.emojis.find(e => e.id === emojiId);
            if (emoji) {
                emoji.votes += 1;
                // Сохраняем в localStorage при каждом изменении
                saveToLocalStorage(state.emojis);
            }
        },
        toggleResults: (state) => {
            state.showResults = !state.showResults;
        },
        clearResults: (state) => {
            state.emojis = state.emojis.map(emoji => ({
                ...emoji,
                votes: 0
            }));
            saveToLocalStorage(state.emojis);
        }
    },
});

export const { voteForEmoji, toggleResults, clearResults } = emojiSlice.actions;

// Селекторы
export const selectEmojis = (state) => state.emoji.emojis;
export const selectShowResults = (state) => state.emoji.showResults;
export const selectWinner = (state) => {
    const emojis = state.emoji.emojis;
    return emojis.reduce((winner, current) =>
        current.votes > winner.votes ? current : winner
    );
};

export default emojiSlice.reducer;