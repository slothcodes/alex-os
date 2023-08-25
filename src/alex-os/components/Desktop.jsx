import React from 'react';
import WindowManagerRedux from './WindowManagerRedux';
import AppWindow from './AppWindow';
import StartBar from './StartBar';
import ResumeWindow from './ResumeWindow';
import './Desktop.css';
import { useDispatch } from 'react-redux';
import { openWindow, closeWindow, focusWindow } from '../../actions/windowActions.js';


let renderCount = 0;

const Desktop = (props) => {
    console.log('new render', renderCount++);
    const dispatch = useDispatch();
    // [ ] This should be replaced with proper imports
    const icons = [
        {src: '../public/file48.svg', windowId: 'About Me'},
        {src: '../public/file48.svg', windowId: 'Resume'},
        {src: '../public/icons8-newspaper-48.png', windowId: 'News Reader'},
        {src: '../public/icons8-typewriter-40.png', windowId: 'Article Writer'}
    ];

    return (
        <div className='desktop'>   
            {icons.map((icon) => (
                <div className='desktop-icon' key={icon.windowId}>
                    <img
                        src={icon.src}
                        alt={`Icon for ${icon.windowId}`}
                        onClick={() => dispatch(openWindow(icon.windowId))}
                    />
                    <h3>{icon.windowId}</h3>
                </div>
            ))}

            <WindowManagerRedux/> 
             
            {/* <StartBar/>  */}
            {/* <StartBar windows={windows} onWindowClick={openWindow} menuItemOpen={openWindow}/>  */}
        </div>
    );
};

export default Desktop;
