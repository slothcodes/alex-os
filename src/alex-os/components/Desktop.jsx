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
    const getInitialWindowPosition = (window.innerWidth - 800) / 2;
    const [windows, setWindows] = React.useState([
        {id: "Resume", position: {x: getInitialWindowPosition, y: 0}, size: {width: 800, height: 800}, isFocused: false, isVisible: false, isMinimized: false, zIndex: 0, content:<ResumeWindow/>},
        {id: "News Reader", position: {x: getInitialWindowPosition, y: 0}, size: {width: 800, height: 800}, isFocused: false, isVisible: false, isMinimized: false, zIndex: 0, content:'window2'},
        {id: "Article Writer", position: {x: getInitialWindowPosition, y: 0}, size: {width: 800, height: 800}, isFocused: false, isVisible: false, isMinimized: false, zIndex: 0, content:'window3'},
        {id: "About Me", position: {x: getInitialWindowPosition, y: 0}, size: {width: 800, height: 800}, isFocused: false, isVisible: false, isMinimized: false, zIndex: 0, content:'window4'}
    ])
    const [zIndexCounter, setZIndexCounter] = React.useState(0);
    const openWindow = (id) => {
        setWindows(windows.map((window) =>{
            return window.id === id ? {...window, isVisible: true, isMinimized: true, isFocused:true, zIndex:1} : {...window, isFocused: false, zIndex: 0}
        }))
    };
    console.log('desktop state', windows)
    return (
        <>
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
            </div>
            <StartBar windows={windows} onWindowClick={openWindow} menuItemOpen={openWindow}/> 
        </>
            

)};


export default Desktop;