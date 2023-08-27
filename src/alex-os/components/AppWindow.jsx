import React from 'react';
import { connect } from 'react-redux';
import ControlBar from './ControlBar.jsx';
import { openWindow, closeWindow, moveWindow } from '../../actions/windowActions.js';
import StartBar from './StartBar';
import './AppWindow.css';

const AppWindow = React.forwardRef((props,ref) => {
    const handleWindowFocus = (e) => {
        props.onFocusToggle(props.appId);
    };
    console.log('ismax',props.isMaximized)
    return (
        <div className= {`window ${props.isMaximized ? 'maximized' : ''}`}
            ref={ref}
            onMouseDown={handleWindowFocus}
            onTouchStart={handleWindowFocus}
            style={{
                position: 'absolute',
                top: props.position.y,
                left: props.position.x,
                zIndex: props.zIndex,
                backgroundColor: props.isFocused ? 'white' : 'lightgray',
                // border: '1px solid black',
            }}
            data-app-id={props.appId}  // Important to identify the window
        >
            <div className='windowControlBar'>
                <ControlBar 
                onClose={() => props.onClose(props.appId)}
                onMax={() => props.onMax(props.appId)}
                onMin={() => props.onMin(props.appId)}
                />
            </div>
            
            <div className='windowContent'>
                {props.content}
            </div>
            
        </div>
    );
});

export default AppWindow;