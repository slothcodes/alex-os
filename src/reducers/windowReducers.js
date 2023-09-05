import { OPEN_WINDOW, CLOSE_WINDOW, MINIMIZE_WINDOW, MAXIMIZE_WINDOW, FOCUS_WINDOW, MOVE_WINDOW } from "../actions/windowActions";

const initialState = {
    windows: [
        {id: "Resume", position: {x: 0, y: 0}, isFocused: false, isVisible: false, isMinimized: false, isMaximized: false, zIndex: 2, content:"ResumeWindow"},
        {id: "RSS Reader", position: {x: 0, y: 0}, isFocused: false, isVisible: false, isMinimized: false, isMaximized: false, zIndex: 2, content:'window2'},
        {id: "Writer's Assistant", position: {x: 0, y: 0}, isFocused: false, isVisible: false, isMinimized: false, isMaximized: false, zIndex: 2, content:'window2'},
        {id: "REACT Projects", position: {x: 0, y: 0}, isFocused: false, isVisible: false, isMinimized: false, isMaximized: false, zIndex: 2, content:'React Projects'},
    ]
};

export const windowReducer = (state = initialState, action) => {
    let updatedWindows;
    switch (action.type) {
        case OPEN_WINDOW:
            updatedWindows = state.windows.map(window => {
                if (window.id === action.payload) {
                    const newWindow = { ...window, isVisible: true, zIndex: 2, isFocused: true, isMinimized: true, position: {x: action.startingX, y: action.startingY,isMaximized: action.mobileView ? true: false } };
                    return newWindow;
                } else {
                    return {...window, zIndex:1, isFocused: false}
                }
            });
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
                    const zIndex = window.isMinimized ? 2 : 1
                    return { ...window, isVisible: !window.isVisible, zIndex: zIndex };
                }
                return {...window, zIndex: 1};
            });
            return { ...state, windows: updatedWindows };

        case MAXIMIZE_WINDOW:
            updatedWindows = state.windows.map(window => {
                if (window.id === action.payload) {
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

