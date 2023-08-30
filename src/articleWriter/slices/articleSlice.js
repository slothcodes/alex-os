// slice for the contents of the article that the api returns

import { createSlice } from "@reduxjs/toolkit";
import { EditorState, convertToRaw } from 'draft-js';

const emptyArticle = EditorState.createEmpty();
const emptyArticleRaw = convertToRaw(emptyArticle.getCurrentContent());

const articleSlice = createSlice({
    name: "article",
    initialState: {
        article: emptyArticleRaw,
    },
    reducers: {
        setArticle: (state, action) => {
            state.article = action.payload;
        }
    }
});

export const {setArticle} = articleSlice.actions;
export default articleSlice.reducer;