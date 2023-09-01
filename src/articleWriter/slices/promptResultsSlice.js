import { createSlice } from '@reduxjs/toolkit';

const outlinePromptResults = createSlice({
    name: 'outlinePromptResults',
    initialState: {
        results: ['hello test world']
    },
    reducers: {
        setList: (state, action) => {
            console.log('setting list', action.payload);
            state.results = action.payload;
        }

    }
});

export const {setList} = outlinePromptResults.actions;
export default outlinePromptResults.reducer;