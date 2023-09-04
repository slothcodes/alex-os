import React from 'react';
import ControlBar from './ControlBar.jsx';
import './AppWindow.css';

const AppWindow = React.forwardRef((props,ref) => {
    const handleWindowFocus = (e) => {
        props.onFocusToggle(props.appId);
    };
    const top = props.isMaximized ? 0 : props.position.y;
    const left = props.isMaximized ? 0 : props.position.x;
    return (
        <div className= {`window ${props.isMaximized ? 'maximized' : ''}`}
            ref={ref}
            onMouseDown={handleWindowFocus}
            onTouchStart={handleWindowFocus}
            style={{
                position: 'absolute',
                top: top,
                left: left, 
                zIndex: props.zIndex,
                backgroundColor: props.isFocused ? 'white' : 'lightgray',
            }}
            data-app-id={props.appId}  // Important to identify the window
        >
            <div className='windowControlBar'>
                <ControlBar 
                onClose={() => props.onClose(props.appId)}
                onMax={() => props.onMax(props.appId)}
                onMin={() => props.onMin(props.appId)}
                mobileView={props.mobileView}
                />
            </div>
            
            <div className='windowContent'>
                {props.content}
            </div>
            
        </div>
    );
});

export default AppWindow;