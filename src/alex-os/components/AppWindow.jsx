import React from 'react';
import App from '../../App';
import ControlBar from './ControlBar';

const AppWindow = ({windows,content,setWindows, initialData, appId, position, size, isFocused, onClose, onMin, onMove, onResize, onFocusToggle}) => {
    // Initial Data State
    const [data, setData] = React.useState(initialData)
    // App Specific State
    const [appState, setAppState] = React.useState({
        isFocused: isFocused,
        position: position,
        size: size
    })
    const windowRef = React.useRef(null)
    const [isDragging, setIsDragging] = React.useState(false)
    const [startDragPosition, setStartDragPosition] = React.useState({x: 0, y: 0})
    
    // Handle Mouse Click
    const handleMouseDown = (e) => {
        // Focus Window
        onFocusToggle(appId)
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
            onMove(appId, newX, newY)
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
            ref={windowRef}
            style={{
                position: 'absolute',
                top: appState.position.y,
                left: appState.position.x,
                width: appState.size.width,
                height: appState.size.height,
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
                onClose={() => onClose(appId)}
                onMax={() => console.log('max')}
                onMin={() => onMin(appId)}
            />
            {content}
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

    const windowComponents = props.windows.map(({ isVisible, content, id, position, size, isFocused }) => {
        if (isVisible === true) {
            return (
                <AppWindow
                    key={id}
                    appId={id}
                    content={content}
                    position={position}
                    size={size}
                    isFocused={isFocused}
                    onClose={handleClose}
                    onMove={handleMove}
                    onResize={handleResize}
                    onFocusToggle={handleFocusToggle}
                    onMin={handleMinimize}
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
