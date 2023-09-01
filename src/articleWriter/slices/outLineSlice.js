import { createSlice } from "@reduxjs/toolkit";


const outLineSlice = createSlice({
    name: "outline",
    initialState: {
        outline: [],
    },
    reducers: {
        addToOutLine: (state,action) => {
            console.log('adding to outline', action.payload);
            state.outline = [...state.outline, action.payload];
        }, 
        removeFromOutline: (state,action) => {
            console.log('removing from outline', action.payload);
            state.outline = state.outline.filter((item) => item !== action.payload);
        }  
    }
});

export const {addToOutLine, removeFromOutline} = outLineSlice.actions;
export default outLineSlice.reducer;