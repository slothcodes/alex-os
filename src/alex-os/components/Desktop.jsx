import React from 'react';
import WindowManager from './AppWindow';
import AppWindow from './AppWindow';
import StartBar from './StartBar';
import ResumeWindow from './ResumeWindow';
import './Desktop.css';

let renderCount = 0;

const Desktop = () => {
    const [openWindows, setOpenWindows] = React.useState([]);

    console.log('new render', renderCount++)
    // [ ] This should be replaced with proper imports
    const icons = [
        {src: '../public/file48.svg', windowId: 'About Me'},
        {src: '../public/file48.svg', windowId: 'Resume'},
        {src: '../public/icons8-newspaper-48.png', windowId: 'News Reader'},
        {src: '../public/icons8-typewriter-40.png', windowId: 'Article Writer'}
    ];
    

                
    const [zIndexCounter, setZIndexCounter] = React.useState(0);
    const openWindow = (windowId) => {
        if (openWindows.includes(windowId)) {
            setOpenWindows(prevOpenWindows => prevOpenWindows.filter(id => id !== windowId));
        } else {
            setOpenWindows(prevOpenWindows => [...prevOpenWindows, windowId]);
        }
    };

    const windowClose = (id) => {
        setOpenWindows(prevOpenWindows => prevOpenWindows.filter(windowId => windowId !== id));
    };
    
    console.log('openWindows', openWindows);

    return (
        <div className='desktop'>   
            {icons.map((icon) => (
                <div className='desktop-icon' key={icon.windowId}>
                    <img
                        src={icon.src}
                        alt={`Icon for ${icon.windowId}`}
                        onClick={() => openWindow(icon.windowId)}
                    />
                    <h3>{icon.windowId}</h3>
                </div>
            ))}

            <WindowManager openWindows={openWindows} setOpenWindows={setOpenWindows} closeWindow={windowClose}zIndex={zIndexCounter} setZIndexCounter={setZIndexCounter}/>   
            {/* <StartBar windows={windows} onWindowClick={openWindow} menuItemOpen={openWindow}/>  */}

        </div>
    );
};

export default Desktop;