export const getWindowContent = (state, id) => {
    const windowContents = state.windows.windows.find(window => window.id === id).content;
    return windowContents;
}   

export const getWindows = (state) => {
    return state.windows.windows;
};