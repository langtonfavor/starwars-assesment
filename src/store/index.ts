import { configureStore } from '@reduxjs/toolkit';
import characterReducer from './slices/Character.slice';
import filmReducer from './slices/Film.slice';

const store = configureStore({
    reducer: {
        character: characterReducer,
        film: filmReducer
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
