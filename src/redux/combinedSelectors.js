// parent component selectors
export const getWindows = (state) => state.windows.windows;
export const getWindowContents = (state) => {
    return state.windows.windows;
}

// child component selectors
export const getArticle = (state) => {
    return state.article.article;
}

export const getOutline = (state) => {
    return state.outline.outline;
}

export const getPromptResults = (state) => {
    return state.promptResults.promptResults;
}