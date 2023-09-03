import { createSlice } from "@reduxjs/toolkit";


const outLineSlice = createSlice({
    name: "outline",
    initialState: {
        outline: [],
    },
    reducers: {
        addToOutLine: (state,action) => {
            state.outline = [...state.outline, action.payload];
        }, 
        removeFromOutline: (state,action) => {
            state.outline = state.outline.filter((item) => item !== action.payload);
        }  
    }
});

export const {addToOutLine, removeFromOutline} = outLineSlice.actions;
export default outLineSlice.reducer;