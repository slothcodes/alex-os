import React from 'react';
import App from '../../App';
import ControlBar from './ControlBar';
import './AppWindow.css';

const AppWindow = (props) => {
    const [data, setData] = React.useState(props.initialData);
    const windowRef = React.useRef(null);
    const [isDragging, setIsDragging] = React.useState(false);
    const [startDragPosition, setStartDragPosition] = React.useState({ x: 0, y: 0 });

    const handleMouseDown = (e) => {
        props.onFocusToggle(props.appId);
        if (e.target.className === 'control-bar') {
            setStartDragPosition({ x: e.clientX, y: e.clientY });
            setIsDragging(true);
        }
    };

    const handleMouseUp = (e) => {
        setIsDragging(false);
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            const newX = props.position.x + (e.clientX - startDragPosition.x);
            const newY = props.position.y + (e.clientY - startDragPosition.y);
            props.onMove(props.appId, newX, newY);
            setStartDragPosition({ x: e.clientX, y: e.clientY });
        }
    };

    const handleTouchStart = (e) => {
        props.onFocusToggle(props.appId);
        setStartDragPosition({ x: e.touches[0].clientX, y: e.touches[0].clientY });
        setIsDragging(true);
    };

    const handleTouchEnd = (e) => {
        setIsDragging(false);
    };

    const handleTouchMove = (e) => {
        if (isDragging) {
            const newX = props.position.x + (e.touches[0].clientX - startDragPosition.x);
            const newY = props.position.y + (e.touches[0].clientY - startDragPosition.y);
            props.onMove(props.appId, newX, newY);
            setStartDragPosition({ x: e.touches[0].clientX, y: e.touches[0].clientY });
        }
    };

    React.useEffect(() => {
        const handleGlobalMouseUp = () => {
            setIsDragging(false);
        };
        window.addEventListener('mouseup', handleGlobalMouseUp);
        return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
    }, []);

    React.useEffect(() => {
        const windowElement = windowRef.current;
        if (windowElement) {
            windowElement.addEventListener('touchstart', handleTouchStart, { passive: false });
            windowElement.addEventListener('touchend', handleTouchEnd, { passive: false });
            windowElement.addEventListener('touchmove', handleTouchMove, { passive: false });
            return () => {
                windowElement.removeEventListener('touchstart', handleTouchStart);
                windowElement.removeEventListener('touchend', handleTouchEnd);
                windowElement.removeEventListener('touchmove', handleTouchMove);
            };
        }
    }, [windowRef.current]);

    return (
        <div className='window'
            ref={windowRef}
            style={{
                position: 'absolute',
                top: props.position.y,
                left: props.position.x,
                zIndex: props.zIndex,
                backgroundColor: props.isFocused ? 'white' : 'lightgray',
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
                onMin={() => props.onMin(props.appId)}
            />
            {props.content}
        </div>
    );
};

const WindowManager = (props) => {
    const [zIndexCounter, setZIndexCounter] = React.useState(0);

    const handleClose = (id) => {
        props.setWindows(props.windows.map((window) => {
            return window.id === id ? { ...window, isVisible: false, isMinimized: false } : window;
        }));
    };

    const handleMinimize = (id) => {
        props.setWindows(props.windows.map((window) => {
            return window.id === id ? { ...window, isVisible: !window.isVisible } : window;
        }));
    };

    const handleMove = (id, newX, newY) => {
        props.setWindows(props.windows.map((window) => {
            return window.id === id ? { ...window, position: { x: newX, y: newY } } : window;
        }));
    };

    const handleFocusToggle = (id) => {
        props.setWindows(props.windows.map((window) => {
            if (window.id === id) {
                setZIndexCounter(zIndexCounter + 1);
                return { ...window, isFocused: true, zIndex: zIndexCounter };
            } else {
                return { ...window, isFocused: false };
            }
        }));
    };

    const windowComponents = props.windows.map((window) => {
        if (window.isVisible) {
            return (
                <AppWindow
                    key={window.id}
                    appId={window.id}
                    content={window.content}
                    position={window.position}
                    size={window.size}
                    isFocused={window.isFocused}
                    zIndex={window.zIndex}
                    onClose={handleClose}
                    onMove={handleMove}
                    onFocusToggle={handleFocusToggle}
                    onMin={handleMinimize}
                />
            );
        }
        return null;
    });

    return <div>{windowComponents}</div>;
};

export default WindowManager;
