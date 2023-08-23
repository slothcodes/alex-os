import React from 'react';
import ControlBar from './ControlBar';
import StartBar from './StartBar';
import ResumeWindow from './ResumeWindow';
import './AppWindow.css';

const AppWindow = (props) => {
    const handleWindowFocus = (e) => {
        props.onFocusToggle(props.appId);
    };
    const windowRef = React.useRef(props.id);

    return (
        <div className='window'
            ref={windowRef}
            onMouseDown={handleWindowFocus}
            onTouchStart={handleWindowFocus}
            style={{
                position: 'absolute',
                top: props.position.y,
                left: props.position.x,
                zIndex: props.zIndex,
                backgroundColor: props.isFocused ? 'white' : 'lightgray',
                border: '1px solid black',
            }}
            data-app-id={props.appId}  // Important to identify the window
        >
            <ControlBar 
                onClose={() => props.onClose(props.appId)}
                onMin={() => props.onMin(props.appId)}
            />
            {props.content}
        </div>
    );
};

const WindowManager = (props) => {          
    const [zIndexCounter, setZIndexCounter] = React.useState(0);
    const openWindow = (windowId) => {
        if (props.openWindows.includes(windowId)) {
            props.setOpenWindows(prevOpenWindows => prevOpenWindows.filter(id => id !== windowId));
        } else {
            props.setOpenWindows(prevOpenWindows => [...prevOpenWindows, windowId]);
        }
    };

    const windowClose = (id) => {
        setOpenWindows(prevOpenWindows => prevOpenWindows.filter(windowId => windowId !== id));
    };
    const getInitialWindowPositionX = () => {
        let windowWidth = window.innerWidth;
        if (window.matchMedia("(max-width: 800px) and (orientation: portrait)").matches) {
            windowWidth = Math.min(windowWidth, 480);
        }
        return Math.max(0, (windowWidth - 800) / 2);
    };

    const getInitialWindowPositionY = () => {
        let windowHeight = window.innerHeight;
        if (window.matchMedia("(max-width: 800px) and (orientation: portrait)").matches) {
            windowHeight = Math.min(windowHeight, 480);
        }
        return Math.max(0, (windowHeight - 800) / 2);
    };

    const [windows, setWindows] = React.useState(() => [
        {id: "Resume", position: {x: getInitialWindowPositionX(), y: 0}, isFocused: false, isVisible: true, isMinimized: true, zIndex: 0, content:<ResumeWindow/>},
        {id: "News Reader", position: {x: getInitialWindowPositionX(), y: 0}, isFocused: false, isVisible: true, isMinimized: true, zIndex: 0, content:'window2'},
    ]);

    // update window state when desktop openwindows changes
    React.useEffect(() => {
        setWindows(prevWindows => {
            return prevWindows.map(window => {
                if (props.openWindows.includes(window.id)) {
                    return { ...window, isVisible: true, isMinimized: true };
                } else {
                    return { ...window, isVisible: false, isMinimized: false };
                }
            });
        });
    }, [props.openWindows]);

    const throttle = (fn, delay) => {
        let timerId;
        return function (...args) {
            if (timerId) {
                clearTimeout(timerId);
            }
            timerId = setTimeout(() => {
                fn(...args);
                timerId = null;
            }, delay);
        }
    };

    const throttledSetWindows = throttle(setWindows, 5);
    const handleClose = (id) => {
        setWindows(prevWindows => {
            return prevWindows.map(window => {
                if (window.id === id) {
                    props.setOpenWindows(props.openWindows.filter(window => window !== id));
                    return { ...window, isVisible: false, isMinimized: false };
                }
                return window;
            });
        // set props.openWindows to filtered array of windows with isVisible === true
        });

    };


    const handleMinimize = (id) => {
        setWindows(prevWindows => {
            return prevWindows.map(window => {
                if (window.id === id) {
                    return { ...window, isVisible: !window.isVisible };
                }
                return window;
            });
        });
    };

    const handleMove = (id, newX, newY) => {
        throttledSetWindows(prevWindows => {
            return prevWindows.map(window => {
                if (window.id === id) {
                    return { ...window, position: { x: newX, y: newY } };
                }
                return window;
            });
        });
    };

    const handleFocusToggle = (id) => {
        console.log('setting focus');
        setZIndexCounter(2);
        
        // Make sure we never exceed the START_BAR_ZINDEX
        if (zIndexCounter >= 100 - 1) {
            setZIndexCounter(2);
        }
    
        setWindows(prevWindows => prevWindows.map(window => {
            if (window.id === id) {
                return { ...window, isFocused: true, zIndex: 2 };
            } else {
                return { ...window, isFocused: false, zIndex: 1 };
            }
        }));
    };
    
    // The event handlers and related functions moved from AppWindow to WindowManager

    const [isDragging, setIsDragging] = React.useState(false);
    const [draggedWindowId, setDraggedWindowId] = React.useState(null);
    const [startDragPosition, setStartDragPosition] = React.useState({x: 0, y: 0});

    const handleMouseDown = (e) => {
        if (e.target && e.target.dataset) {
            const windowId = e.target.closest("[data-app-id]").dataset.appId;
            if (e.target.className === 'control-bar') {
                setIsDragging(true);
                setDraggedWindowId(windowId);
                setStartDragPosition({ x: e.clientX, y: e.clientY });
                }
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setDraggedWindowId(null);
    };

    const handleMouseMove = (e) => {
        if (!isDragging || !draggedWindowId) return;

        const currentWindow = windows.find(win => win.id === draggedWindowId);
        if (!currentWindow) return;

        const dx = e.clientX - startDragPosition.x;
        const dy = e.clientY - startDragPosition.y;

        handleMove(draggedWindowId, currentWindow.position.x + dx, currentWindow.position.y + dy);
        setStartDragPosition({ x: e.clientX, y: e.clientY });
    };

    const handleTouchStart = (e) => {
        const windowId = e.target.closest("[data-app-id]").dataset.appId;
        if (e.target.className === 'control-bar') {
            setIsDragging(true);
            setDraggedWindowId(windowId);
            setStartDragPosition({ x: e.touches[0].clientX, y: e.touches[0].clientY });
        }
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
        setDraggedWindowId(null);
    };

    const handleTouchMove = (e) => {
        if (!isDragging || !draggedWindowId) return;

        const currentWindow = windows.find(win => win.id === draggedWindowId);
        if (!currentWindow) return;

        const dx = e.touches[0].clientX - startDragPosition.x;
        const dy = e.touches[0].clientY - startDragPosition.y;

        handleMove(draggedWindowId, currentWindow.position.x + dx, currentWindow.position.y + dy);
        setStartDragPosition({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    };

    React.useEffect(() => {
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mousemove', handleMouseMove);
        
        // Touch events
        window.addEventListener('touchstart', handleTouchStart, { passive: false });
        window.addEventListener('touchend', handleTouchEnd, { passive: false });
        window.addEventListener('touchmove', handleTouchMove, { passive: false });

        return () => {
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mousemove', handleMouseMove);

            // Remove touch event listeners
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchend', handleTouchEnd);
            window.removeEventListener('touchmove', handleTouchMove);
        }
    }, [windows, isDragging, draggedWindowId, startDragPosition]);

    React.useEffect(() => {
        const handleGlobalMouseUp = () => {
            setIsDragging(false);
        };
        window.addEventListener('mouseup', handleGlobalMouseUp);
        return () => {
            window.removeEventListener('mouseup', handleGlobalMouseUp);
        };
    }, []);

    const windowComponents = windows
        .filter(window => props.openWindows.includes(window.id))
        .map((window) => {
            if (window.isVisible) {
                return (
                    <AppWindow
                        key={window.id}
                        appId={window.id}
                        content={window.content}
                        position={window.position}
                        isFocused={window.isFocused}
                        onFocusToggle={handleFocusToggle}
                        zIndex={window.zIndex}
                        onClose={handleClose}
                        handleMouseDown={handleMouseDown}
                        handleMouseMove={handleMouseMove}
                        handleTouchStart={handleTouchStart}
                        handleTouchEnd={handleTouchEnd}
                        handleTouchMove={handleTouchMove}
                        onMin={handleMinimize}
                        data-app-id={window.id} // Using a data attribute to identify the window
                    />
                );
        }
        return null;
    });

    return <div><div>{windowComponents}</div><div><StartBar windows={windows} onFocusToggle={handleFocusToggle} menuItemOpen={()=> console.log('open')}/></div></div>;
};

export default WindowManager;
