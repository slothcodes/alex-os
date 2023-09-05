import React, {useRef} from 'react';
import ControlBar from './ControlBar';
import StartBar from './StartBar';
import { useSelector, useDispatch } from 'react-redux';
import { getWindows } from '../../selectors/windowSelectors';
import { openWindow,closeWindow, focusWindow, moveWindow, minimizeWindow, maximizeWindow } from '../../actions/windowActions.js';
import './AppWindow.css';
import AppWindow from './AppWindow';
import { current } from '@reduxjs/toolkit';
import ResumeWindow from './ResumeWindow';
import ProjectWindow from './projectsWindow/ProjectWindow.jsx';
import NewsReader from '../../newsReader/containers/NewsReader';
import ArticleWriterMain from '../../articleWriter/ArticleWriterApp';

const WindowManager = (props) => {         
    const dispatch = useDispatch();
    const windowRef = useRef(null);
    const windows = useSelector(getWindows);
    const handleMove = (id, newX, newY) => {
            dispatch(moveWindow(id, newX, newY)); 
    };

    const handleFocusToggle = (id) => {     
        dispatch(focusWindow(id));
    };

    const handleClose = (id) => {
        dispatch(closeWindow(id));
    };

    const handleMinimize = (id) => {
        dispatch(focusWindow(id))
        dispatch(minimizeWindow(id));
    };

    const handleOpen = (id) => {
        dispatch(openWindow(id));
    };

    const [isDragging, setIsDragging] = React.useState(false);
    const [draggedWindowId, setDraggedWindowId] = React.useState(null);

    const handleSetIsDragging = (isDraggingBool) => {
        if (props.isMaximized) {
            setIsDragging(false);
        } else {
            setIsDragging(isDraggingBool);
        }
        
    };

    const handleMouseDown = (e) => {
        if (e.target && e.target.dataset) {
                const closestElement = e.target.closest("[data-app-id]");
            // check whether there is a closest element and if it has a data-app-id attribute
            if(closestElement){
                const windowId = e.target.closest("[data-app-id]").dataset.appId;
                handleFocusToggle(windowId)
                if (e.target.className === 'control-bar') {
                    handleSetIsDragging(true);
                    setDraggedWindowId(windowId);
                    lastMousePosition.current = { x: e.clientX, y: e.clientY };
                    }
            }
            
        }
    };

    const handleMouseUp = () => {
        handleSetIsDragging(false);
        setDraggedWindowId(null);
    };

    const lastMousePosition = useRef({ x: 0, y: 0 });
    const handleMouseMove = (e) => {
        if (!isDragging || !draggedWindowId) return;
        const currentWindow = windows.find(win => win.id === draggedWindowId);
        if (!currentWindow) return;
        // get the window width and height from the ref
        const draggedWindowRef = windowRefs.current.get(draggedWindowId)
        const width = props.width
        const height = props.height - props.startBarHeight
        // Calculate the distance the mouse has moved
        const dx = e.clientX - lastMousePosition.current.x;
        const dy = e.clientY - lastMousePosition.current.y;
        lastMousePosition.current = { x: e.clientX, y: e.clientY };
        // calculate the new window position
        let newX = currentWindow.position.x + dx;
        let newY = currentWindow.position.y + dy;
        // Ensure The Window Does Not Get Dragged Off Screen
        newX = Math.min(Math.max(newX, 0), window.innerWidth - draggedWindowRef.current.clientWidth);
        newY = Math.min(Math.max(newY, 0), window.innerHeight - (draggedWindowRef.current.clientHeight + props.startBarHeight));
        handleMove(draggedWindowId, newX, newY);
    };

    const handleTouchStart = (e) => {
        const windowId = e.target.closest("[data-app-id]").dataset.appId;
        if (e.target.className === 'control-bar') {
            handleSetIsDragging(true);
            setDraggedWindowId(windowId);
            lastMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }
    };

    const handleTouchEnd = () => {
        handleSetIsDragging(false);
        setDraggedWindowId(null);
    };

    const handleTouchMove = (e) => {
        if (!isDragging || !draggedWindowId) return;
        const currentWindow = windows.find(win => win.id === draggedWindowId);
        if (!currentWindow) return;

        // get the window width and height from the ref
        const draggedWindowRef = windowRefs.current.get(draggedWindowId)
        const width = props.width//draggedWindowRef.current.clientWidth
        const height = props.height - props.startBarHeight//draggedWindowRef.current.clientHeight;
        // Calculate the distance the mouse has moved
        const dx = e.touches[0].clientX - lastMousePosition.current.x;
        const dy = e.touches[0].clientY - lastMousePosition.current.y;
        lastMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        // calculate the new window position
        let newX = currentWindow.position.x + dx;
        let newY = currentWindow.position.y + dy;
        // Ensure The Window Does Not Get Dragged Off Screen
        newX = Math.min(Math.max(newX, 0), window.innerWidth - draggedWindowRef.current.clientWidth);
        newY = Math.min(Math.max(newY, 0), window.innerHeight - (draggedWindowRef.current.clientHeight + props.startBarHeight));
        handleMove(draggedWindowId, newX, newY);
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
    }, [windows, isDragging, draggedWindowId,lastMousePosition]);

    React.useEffect(() => {
        const handleGlobalMouseUp = () => {
            handleSetIsDragging(false);
        };
        window.addEventListener('mouseup', handleGlobalMouseUp);
        return () => {
            window.removeEventListener('mouseup', handleGlobalMouseUp);
        };
    }, []);

    const lookUpContent = (id) => {
        switch (id) {
            case 'Resume':
                return <ResumeWindow/>;
            case 'RSS Reader':
                return <NewsReader/>;
            case "Writer's Assistant":
                return <ArticleWriterMain/>;
            case 'REACT Projects':
                return <ProjectWindow/>;
            default:
                console.log('No Match')
                return 'No Content';
        } 
    };

    const windowRefs = useRef(new Map()) //windows.map(window => React.createRef())) //.current;
    const windowComponents = windows.map((window) => {
        if (!windowRefs.current.has(window.id)) {
            windowRefs.current.set(window.id, React.createRef());
        }
        if (window.isVisible) {
            return (
                <AppWindow
                    ref={windowRefs.current.get(window.id)}
                    mobileView = {props.mobileView}
                    key={window.id}
                    appId={window.id}
                    content={lookUpContent(window.id)}
                    position={window.position}
                    isFocused={window.isFocused}
                    isMaximized={props.mobileView ? true: window.isMaximized}
                    onFocusToggle={handleFocusToggle}
                    zIndex={window.zIndex}
                    onClose={handleClose}
                    handleMouseDown={handleMouseDown}
                    handleMouseMove={handleMouseMove}
                    handleTouchStart={handleTouchStart}
                    handleTouchEnd={handleTouchEnd}
                    handleTouchMove={handleTouchMove}
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
        </div>
    );
};

export default WindowManager;
