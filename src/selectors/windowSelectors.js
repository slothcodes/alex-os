export const getWindowContent = (state, id) => {
    const windowContents = state.windows.windows.find(window => window.id === id).content;
    return windowContents;
}   

export const getWindows = (state) => {
    console.log('getting open windows', state.windows.windows);
    return state.windows.windows;
};

// export const moveWindow = (state, id, newx,newy) => {
//     console.log('moving window', state)
//     const updatedWindows = state.windows.windows.map(window => {
//         if (window.id === id) {
//             return { ...window, position: {x:newx, y:newy} };
//         }
//         return window;
//     });
//     return { ...state, windows: updatedWindows };
// }   

// export const focusWindow = (state, id) => {
//     console.log('focusing window', state)
//     const updatedWindows = state.windows.windows.map(window => {
//         if (window.id === id) {
//             return { ...window, isFocused: true, zIndex: 2 };
//         }
//         return { ...window, isFocused: false, zIndex: 1 };
//     });
//     return { ...state, windows: updatedWindows };
// }