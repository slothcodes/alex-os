import React from 'react';
import ControlBar from './ControlBar';
import StartBar from './StartBar';
import { useSelector, useDispatch } from 'react-redux';
import { getWindows } from '../../selectors/windowSelectors';
import { openWindow,closeWindow, focusWindow, moveWindow, minimizeWindow, maximizeWindow } from '../../actions/windowActions.js';
import './AppWindow.css';
import AppWindow from './AppWindow';

const WindowManager = () => {         
    const dispatch = useDispatch();
    
    const windows = useSelector(getWindows);
    console.log('windows', windows);

    const handleMove = (id, newX, newY) => {
        dispatch(moveWindow(id, newX, newY));
    };

    const handleFocusToggle = (id) => {
        console.log('setting focus');        
        dispatch(focusWindow(id));
    };

    const handleClose = (id) => {
        dispatch(closeWindow(id));
    };

    const handleMinimize = (id) => {
        dispatch(minimizeWindow(id));
    };

    const handleOpen = (id) => {
        dispatch(openWindow(id));
    };

    // ... [Rest of the component logic remains unchanged]
    // The event handlers and related functions moved from AppWindow to WindowManager

    const [isDragging, setIsDragging] = React.useState(false);
    const [draggedWindowId, setDraggedWindowId] = React.useState(null);
    const [startDragPosition, setStartDragPosition] = React.useState({x: 0, y: 0});

    const handleMouseDown = (e) => {
        if (e.target && e.target.dataset) {
                const closestElement = e.target.closest("[data-app-id]");
            // check whether there is a closest element and if it has a data-app-id attribute
            if(closestElement){
                const windowId = e.target.closest("[data-app-id]").dataset.appId;
                handleFocusToggle(windowId)
                if (e.target.className === 'control-bar') {
                    console.log('mouse down function fired')
                    setIsDragging(true);
                    setDraggedWindowId(windowId);
                    setStartDragPosition({ x: e.clientX, y: e.clientY });
                    }
            }
            
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setDraggedWindowId(null);
    };

    const handleMouseMove = (e) => {
        if (!isDragging || !draggedWindowId) return;
        console.log('handlemousemove');
        const currentWindow = windows.find(win => win.id === draggedWindowId);
        console.log('currentWindow', currentWindow);
        if (!currentWindow) return;
        console.log(e.clientX, e.clientY)
        const dx = e.clientX - startDragPosition.x;
        const dy = e.clientY - startDragPosition.y;
        console.log('dx', dx, 'dy', dy, 'handlemousemove');
        console.log('currentWindow.position.x', currentWindow.position.x, 'currentWindow.position.y', currentWindow.position.y)
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
        console.log('dx', dx, 'dy', dy);
        handleMove(draggedWindowId, currentWindow.position.x + dx, currentWindow.position.y + dy);
        setStartDragPosition({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    };

    // Start Exploring the problem here. Add event listeners one at a time until the problem is found
    React.useEffect(() => {
         window.addEventListener('mousedown', handleMouseDown);
         window.addEventListener('mouseup', handleMouseUp);
         window.addEventListener('mousemove', handleMouseMove);
        
    //     // Touch events
         window.addEventListener('touchstart', handleTouchStart, { passive: false });
         window.addEventListener('touchend', handleTouchEnd, { passive: false });
         window.addEventListener('touchmove', handleTouchMove, { passive: false });

         return () => {
             window.removeEventListener('mousedown', handleMouseDown);
             window.removeEventListener('mouseup', handleMouseUp);
             window.removeEventListener('mousemove', handleMouseMove);

    //         // Remove touch event listeners
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
    console.log('windows', windows);
    const windowComponents = windows.map((window) => {
            console.log('window', window);
            if (window.isVisible) {
                return (
                    <AppWindow
                        key={window.id}
                        appId={window.id}
                        content={window.content}
                        position={window.position}
                        isFocused={window.isFocused}
                        isMaximized={window.isMaximized}
                        onFocusToggle={handleFocusToggle}
                        zIndex={window.zIndex}
                        onClose={handleClose}
                        handleMouseDown={handleMouseDown}
                        handleMouseMove={handleMouseMove}
                        // handleTouchStart={handleTouchStart}
                        // handleTouchEnd={handleTouchEnd}
                        // handleTouchMove={handleTouchMove}
                        onMin={handleMinimize}
                        onMax={() => dispatch(maximizeWindow(window.id))}
                        data-app-id={window.id} // Using a data attribute to identify the window
                    />
                );
        }
        return null;
    });

    return (
        <div>
            <div>{windowComponents}</div>
            {/* <div>
                <StartBar windows={windows} onFocusToggle={handleFocusToggle} menuItemOpen={() => console.log('open')} />
            </div> */}
        </div>
    );
};

export default WindowManager;
