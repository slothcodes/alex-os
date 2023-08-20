import React from 'react';
import App from '../../App';

const AppWindow = ({initialData, appId, position, size, isFocused, onClose, onMove, onResize, onFocusToggle}) => {
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
        if (e.target.className === 'window-bar') {
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
            <h1 className='window-bar'>Window</h1>
        </div>
    )}

const WindowManager = () => {
    // State To Track Open Windows
    const [windows, setWindows] = React.useState([
        {id: "test", position: {x: 0, y: 0}, size: {width: 200, height: 200}, isFocused: true},
        {id: "newsReader", position: {x: 0, y: 0}, size: {width: 200, height: 200}, isFocused: false},
    ])
    const handleClose = (id) => {
        // Close Window
        setWindows(windows.filter((window) => window.id !== id))
    };

    const handleMove = (id, newX,newY) => {
        // Move Window
        setWindows(windows.map((window) => 
                window.id === id ? {...window,position: {x: newX, y: newY}} : window
            ));
        

        };
    const handleResize = (id, newWidth,newHeight) => {
        // Resize Window
        setWindows(windows.map((window) => {
                return window.id === id ? {...window,size: {width: newWidth, height: newHeight}} : window
            }));
        };
    const handleFocusToggle = (id) => {
        // Toggle Focus
        setWindows(windows.map((window) => {
                return window.id === id ? {...window,isFocused: !window.isFocused} : window
            }));
        };
    return (
        <div>
            {windows.map((window) => (
                console.log(window),
                <AppWindow
                    key={window.id}
                    initialData={window}
                    appId={window.id}
                    position={window.position}
                    size={window.size}
                    isFocused={window.isFocused}
                    onClose={handleClose}
                    onMove={handleMove}
                    onResize={handleResize}
                    onFocusToggle={handleFocusToggle}
                />
            ))}
        </div>
    );
}

export default WindowManager;
