import React from 'react';
import { connect } from 'react-redux';
import ControlBar from './ControlBar.jsx';
import { openWindow, closeWindow, moveWindow } from '../../actions/windowActions.js';
import StartBar from './StartBar';
import './AppWindow.css';

const AppWindow = (props) => {
    const handleWindowFocus = (e) => {
        props.onFocusToggle(props.appId);
    };
    const windowRef = React.useRef(props.id);
    console.log('ismax',props.isMaximized)
    return (
        <div className= {`window ${props.isMaximized ? 'maximized' : ''}`}
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
                onMax={() => props.onMax(props.appId)}
                onMin={() => props.onMin(props.appId)}
            />
            {props.content}
        </div>
    );
};

export default AppWindow;