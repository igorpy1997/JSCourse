import { configureStore } from '@reduxjs/toolkit';
import emojiReducer from './slices/emojiSlice';

export const store = configureStore({
    reducer: {
        emoji: emojiReducer,
    },
});