import { EditorState, convertToRaw } from "draft-js";

// Parent component actions
export const OPEN_WINDOW = "OPEN_WINDOW";
export const CLOSE_WINDOW = "CLOSE_WINDOW";
export const MINIMIZE_WINDOW = "MINIMIZE_WINDOW";
export const MAXIMIZE_WINDOW = "MAXIMIZE_WINDOW";
export const FOCUS_WINDOW = "FOCUS_WINDOW";
export const MOVE_WINDOW = "MOVE_WINDOW";
// Child actions from slice files
export const SET_ARTICLE = "article/setArticle";
export const ADD_TO_OUTLINE = "outline/addToOutline";
export const REMOVE_FROM_OUTLINE = "outline/removeFromOutline";
export const SET_LIST = "promptResults/setList";

// combined action creators

// parent actions
export const openWindow = (id, startingX, startingY, mobileView) => ({
    type: OPEN_WINDOW,
    payload: id,
    startingX,
    startingY,
    mobileView
})

export const closeWindow = (windowId) => ({
    type: CLOSE_WINDOW,
    payload: windowId
});

export const minimizeWindow = (windowId) => ({
    type: MINIMIZE_WINDOW,
    payload: windowId
});

export const maximizeWindow = (windowId) => ({
    type: MAXIMIZE_WINDOW,
    payload: windowId
});

export const focusWindow = (windowId) => ({
    type: FOCUS_WINDOW,
    payload: windowId
});

export const moveWindow = (windowId, x,y) => ({
    type: MOVE_WINDOW,
    payload: { id: windowId, x:x, y:y }
});

// Child component actions
// articleSlice actions
export const setArticle = (article) => ({
    type: SET_ARTICLE,
    payload: article
});

// outlineSlice actions
export const addToOutline = (outlineItem) => ({
    type: ADD_TO_OUTLINE,
    payload: outlineItem
});

export const removeFromOutline = (outlineItem) => ({
    type: REMOVE_FROM_OUTLINE,
    payload: outlineItem
});

// promptResultsSlice actions
export const setList = (list) => ({
    type: SET_LIST,
    payload: list
});




