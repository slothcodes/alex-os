// store.js
import { configureStore } from '@reduxjs/toolkit';
import { windowReducer } from '../reducers/windowReducers';

const store = configureStore({
    reducer: {
        windows: windowReducer
    }
});

export default store;
