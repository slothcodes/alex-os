import { OPEN_WINDOW, CLOSE_WINDOW, MINIMIZE_WINDOW, MAXIMIZE_WINDOW, FOCUS_WINDOW, MOVE_WINDOW } from "../actions/windowActions";

const initialState = {
    windows: [
        {id: "Resume", position: {x: 100, y: 0}, isFocused: false, isVisible: true, isMinimized: false, isMaximized: false, zIndex: 2, content:"ResumeWindow"},
        {id: "News Reader", position: {x: 0, y: 0}, isFocused: false, isVisible: true, isMinimized: false, isMaximized: false, zIndex: 2, content:'window2'},
        {id: "Article Writer", position: {x: 0, y: 0}, isFocused: false, isVisible: true, isMinimized: false, isMaximized: false, zIndex: 2, content:'window2'},
        {id: "React Projects", position: {x: 0, y: 0}, isFocused: false, isVisible: true, isMinimized: false, isMaximized: false, zIndex: 2, content:'React Projects'},
    ]
};

export const windowReducer = (state = initialState, action) => {
    let updatedWindows;
    switch (action.type) {
        case OPEN_WINDOW:
            console.log('opening window', action.startingX, action.startingY)
            updatedWindows = state.windows.map(window => {
                if (window.id === action.payload) {
                    const newWindow = { ...window, isVisible: true, isMinimized: true, position: {x: action.startingX, y: action.startingY,isMaximized: action.mobileView ? true: false } };
                    console.log('new window', newWindow)
                    return newWindow;
                }
                return window;
            });

            // if (!state.windows.some(window => window.id === action.payload)) {
            //     updatedWindows.push({ id: action.payload, isVisible: true, isMinimized: true });
            // }
            return { ...state, windows: updatedWindows };

        case CLOSE_WINDOW:
            updatedWindows = state.windows.map(window => {
                if (window.id === action.payload) {
                    return { ...window, isVisible: false, isMinimized: false };
                }
                return window;
            });
            return { ...state, windows: updatedWindows };

        case MINIMIZE_WINDOW:
            updatedWindows = state.windows.map(window => {
                if (window.id === action.payload) {
                    return { ...window, isVisible: !window.isVisible };
                }
                return window;
            });
            return { ...state, windows: updatedWindows };

        case MAXIMIZE_WINDOW:
            updatedWindows = state.windows.map(window => {
                if (window.id === action.payload) {
                    console.log('maximizing window', window)
                    return { ...window, isMaximized: !window.isMaximized, position: {x: 0, y: 0} };
                }
                return window;
            });
            return { ...state, windows: updatedWindows };

        case FOCUS_WINDOW:
            updatedWindows = state.windows.map(window => {
                if (window.id === action.payload) {
                    return { ...window, zIndex: 2 };
                }
                return { ...window, zIndex: 1 };
            });
            return { ...state, windows: updatedWindows };
        
        case MOVE_WINDOW:
            console.log('moving window', action.payload)
            updatedWindows = state.windows.map(window => {
                if (window.id === action.payload.id) {
                    return { ...window, position: {x: action.payload.x, y:action.payload.y} };
                }
                return window;
            });
            return { ...state, windows: updatedWindows };


        default:
            return state;
    }
};

export default windowReducer;

