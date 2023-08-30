import { combineReducers } from "@reduxjs/toolkit";
import windowReducer from "../reducers/windowReducers";
import articleReducer from "../articleWriter/slices/articleSlice";
import outLineReducer from "../articleWriter/slices/outLineSlice";
import promptResultsSlice from "../articleWriter/slices/promptResultsSlice";

const rootReducer = combineReducers({
    windows: windowReducer,
    article: articleReducer,
    outline: outLineReducer,
    promptResults: promptResultsSlice,
});

export default rootReducer;