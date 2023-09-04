import { createSlice } from '@reduxjs/toolkit';

const outlinePromptResults = createSlice({
    name: 'outlinePromptResults',
    initialState: {
        results: []
    },
    reducers: {
        setList: (state, action) => {
            state.results = action.payload;
        }

    }
});

export const {setList} = outlinePromptResults.actions;
export default outlinePromptResults.reducer;