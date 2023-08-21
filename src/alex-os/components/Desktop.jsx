import React from 'react';
import WindowManager from './AppWindow';
import AppWindow from './AppWindow';
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
        {id: "Resume", position: {x: 0, y: 0}, size: {width: 200, height: 200}, isFocused: true, isVisible: false},
        {id: "News Reader", position: {x: 0, y: 0}, size: {width: 200, height: 200}, isFocused: false, isVisible: false},
        {id: "Article Writer", position: {x: 0, y: 0}, size: {width: 200, height: 200}, isFocused: false, isVisible: false},
        {id: "About Me", position: {x: 0, y: 0}, size: {width: 200, height: 200}, isFocused: false, isVisible: false}
    ])
    console.log('w',windows);
    const openWindow = (id) => {
        console.log('id', id, 'window.id', windows[0].id);
        setWindows(windows.map((window) =>{
            
            return window.id === id ? {...window, isVisible: true} : window
        }))
    };

    const windowComponents = windows.map(({ isVisible, id, position, size, isFocused }) => {
        console.log('isVisible', isVisible, 'id', id, 'position', position, 'size', size, 'isFocused', isFocused);
        if (isVisible === true) {
            return (
                <AppWindow
                    key={id}
                    initialData={currentWindow}
                    appId={id}
                    position={position}
                    size={size}
                    isFocused={isFocused}
                    onClose={handleClose}
                    onMove={handleMove}
                    onResize={handleResize}
                    onFocusToggle={handleFocusToggle}
                />
            );
        }
        
        return null;
    });
    console.log('windowComponents', windowComponents);
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
                {windowComponents}
            <WindowManager windows={windows} setWindows={setWindows}/>    
            </div>
            

)};


export default Desktop;