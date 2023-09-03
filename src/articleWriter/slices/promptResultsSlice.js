import { createSlice } from '@reduxjs/toolkit';

const outlinePromptResults = createSlice({
    name: 'outlinePromptResults',
    initialState: {
        results: ['hello test world','testing this out', 'yet another testing input']
    },
    reducers: {
        setList: (state, action) => {
            state.results = action.payload;
        }

    }
});

export const {setList} = outlinePromptResults.actions;
export default outlinePromptResults.reducer;