export const OPEN_WINDOW = 'OPEN_WINDOW';   
export const CLOSE_WINDOW = 'CLOSE_WINDOW';
export const MINIMIZE_WINDOW = 'MINIMIZE_WINDOW';
export const MAXIMIZE_WINDOW = 'MAXIMIZE_WINDOW';
export const FOCUS_WINDOW = 'FOCUS_WINDOW';
export const MOVE_WINDOW = 'MOVE_WINDOW';

export const openWindow = (windowId) => ({
    type: OPEN_WINDOW,
    payload: windowId
});

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
