import React from 'react';
import App from '../../App';
import ControlBar from './ControlBar';
import './AppWindow.css';

const AppWindow = (props) => {
    // Initial Data State
    console.log('props',props)
    const [data, setData] = React.useState(props.initialData)
    // App Specific State
    const [appState, setAppState] = React.useState({
        isFocused: props.isFocused,
        position: props.position,
        size: props.size
    })
    const windowRef = React.useRef(null)
    const [isDragging, setIsDragging] = React.useState(false)
    const [startDragPosition, setStartDragPosition] = React.useState({x: 0, y: 0})
    
    // Handle Mouse Click
    const handleMouseDown = (e) => {
        // Focus Window
        props.onFocusToggle(props.appId)
        // Set Dragging State
        if (e.target.className === 'control-bar') {
            setStartDragPosition({x: e.clientX, y: e.clientY})
            setIsDragging(true)
        }
    }
    const handleMouseUp = (e) => {
        // Set Dragging State
        setIsDragging(false)
    }
    // Handle Mouse Move
    const handleMouseMove = (e) => {
        if (isDragging) {
            // Calculate New Position
            const newX = appState.position.x + (e.clientX - startDragPosition.x)
            const newY = appState.position.y + (e.clientY - startDragPosition.y)
            // update local state
            setAppState({...appState, position: {x: newX, y: newY}})
            props.onMove(props.appId, newX, newY)
            setStartDragPosition({x: e.clientX, y: e.clientY})
        }
    };

    // Handle Touch Events
    const handleTouchStart = (e) => {
        onFocusToggle(appId)
        setStartDragPosition({x: e.touches[0].clientX, y: e.touches[0].clientY})
        setIsDragging(true)
    }
    const handleTouchEnd = (e) => {
        setIsDragging(false)
    }

    const handleTouchMove = (e) => {
        
        if (isDragging) {
            const newX = appState.position.x + (e.touches[0].clientX - startDragPosition.x)
            const newY = appState.position.y + (e.touches[0].clientY - startDragPosition.y)
            setAppState({
                ...appState,
                position: {x: newX, y: newY}
            })
            onMove(appId, newX, newY)
            setStartDragPosition({x: e.touches[0].clientX, y:e.touches[0].clientY})
        }
    }

    const windowClass = props.isMaximized ? 'window-maximized' : 'window-default';
    console.log('windowClass',windowClass)

    React.useEffect(() => {
        const handleGlobalMouseUp = () => {
            setIsDragging(false)
        };
        window.addEventListener('mouseup', handleGlobalMouseUp)
        return () => window.removeEventListener('mouseup', handleGlobalMouseUp)
    }, [])
    // add event listener to handle e.preventDefault() on touchmove
    React.useEffect(() => {
        const windowElement = windowRef.current;
        if (windowElement) {
            windowElement.addEventListener('touchstart',handleTouchStart, {passive: false})
            windowElement.addEventListener('touchend',handleTouchEnd, {passive: false})
            windowElement.addEventListener('touchmove',handleTouchMove, {passive: false})
            return () => {
                windowElement.removeEventListener('touchstart',handleTouchStart)
                windowElement.removeEventListener('touchend',handleTouchEnd)
                windowElement.removeEventListener('touchmove',handleTouchMove)
            }
        }
    }, [windowRef.current])


    return (
        <div
            className={windowClass}
            ref={windowRef}
            style={{
                position: 'absolute',
                top: appState.position.y,
                left: appState.position.x,
                minWidth: appState.size.width,
                minHeight: appState.size.height,
                zIndex: appState.isFocused ? 1 : 0,
                backgroundColor: appState.isFocused ? 'white' : 'lightgray',
                border: '1px solid black',
            }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchMove={handleTouchMove}
        >
            <ControlBar 
                onClose={() => props.onClose(props.appId)}
                onMax={() => props.onMax(props.appId)}
                onMin={() => props.onMin(props.appId)}
            />
            {props.content}
        </div>
    )}

const WindowManager = (props) => {
    // set isVisible to false rather than filtering the window from the state
    const handleClose = (id) => {
        props.setWindows(props.windows.map((window) =>{
            return window.id === id ? {...window, isVisible: false, isMinimized: false} : window
        }))
    };

    const handleMinimize = (id) => {
        console.log('minimize',id)
        props.setWindows(props.windows.map((window) =>{       
                return window.id === id ? {...window, isVisible: !window.isVisible} : window
            }
        ))
    };

    const handleMaximize = (appId) => {
        // setIsMaximized(!isMaximized);
        console.log('maximize',props.windows)
        props.setWindows(props.windows.map((window) => {
            return window.id === appId ? {...window, isMaximized: !window.isMaximized} : window//, size:{x: 400, y:400}} : window
        }))
    };

    const handleMove = (id, newX,newY) => {
        props.setWindows(props.windows.map((window) => 
                window.id === id ? {...window,position: {x: newX, y: newY}} : window
            ));
        

        };
    const handleResize = (id, newWidth,newHeight) => {
        props.setWindows(props.windows.map((window) => {
                return window.id === id ? {...window,size: {width: newWidth, height: newHeight}} : window
            }));
        };
    const handleFocusToggle = (id) => {
        props.setWindows(props.windows.map((window) => {
                return window.id === id ? {...window,isFocused: !window.isFocused} : window
            }));
        };

    const windowComponents = props.windows.map((window) => {
        if (window.isVisible === true) {
            return (
                <AppWindow
                    key={window.id}
                    appId={window.id}
                    content={window.content}
                    position={window.position}
                    size={window.size}
                    isFocused={window.isFocused}
                    isMaximized={window.isMaximized}
                    onClose={handleClose}
                    onMove={handleMove}
                    onResize={handleResize}
                    onFocusToggle={handleFocusToggle}
                    onMin={handleMinimize}
                    onMax={handleMaximize}
                />
            );
        }    
        return null;
    });
    return (
        <div>
            {windowComponents}
        </div>
    );
}

export default WindowManager;
