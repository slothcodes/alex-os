import { combineReducers } from 'redux';
import outLineReducer from './outLineSlice';
import PromptResultsReducer from './promptResultsSlice';
import articleReducer from './articleSlice';

const rootReducer = combineReducers({
    outline: outLineReducer,
    promptResults: PromptResultsReducer,
    article: articleReducer
});

export default rootReducer;