import React from 'react';
import WindowManager from './AppWindow';
import AppWindow from './AppWindow';
import StartBar from './StartBar';
import ResumeWindow from './ResumeWindow';
import './Desktop.css';

const Desktop = () => {
    // [ ] correct src paths so that they are imports
    const icons = [{src: '../public/file48.svg', windowId: 'About Me'},
                   {src: '../public/file48.svg', windowId: 'Resume'},
                   {src: '../public/icons8-newspaper-48.png', windowId: 'News Reader'},
                   {src: '../public/icons8-typewriter-40.png', windowId: 'Article Writer'}
                ]
    // State To Track Open Windows
    const [windows, setWindows] = React.useState([
        {id: "Resume", position: {x: 0, y: 0}, size: {width: 200, height: 200}, isFocused: true, isVisible: false, isMinimized: false, content:<ResumeWindow/>},
        {id: "News Reader", position: {x: 0, y: 0}, size: {width: 200, height: 200}, isFocused: false, isVisible: false, isMinimized: false, content:'window2'},
        {id: "Article Writer", position: {x: 0, y: 0}, size: {width: 200, height: 200}, isFocused: false, isVisible: false, isMinimized: false, content:'window3'},
        {id: "About Me", position: {x: 0, y: 0}, size: {width: 200, height: 200}, isFocused: false, isVisible: false, isMinimized: false, content:'window4'}
    ])
    const openWindow = (id) => {
        setWindows(windows.map((window) =>{
            return window.id === id ? {...window, isVisible: true, isMinimized: true} : window
        }))
    };

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

            <WindowManager windows={windows} setWindows={setWindows}/>   
            <StartBar windows={windows} onWindowClick={openWindow} menuItemOpen={openWindow}/> 
            </div>
            

)};


export default Desktop;