import React from 'react';
import WindowManager from './AppWindow';
import AppWindow from './AppWindow';
import './Desktop.css';

const Desktop = () => {
    
    return (
        <div className='desktop'>
            <h1>Desktop</h1>
            <a href=""><img src='../public/file48.svg'/></a>
            <a href="">Article Assistant Folder</a>
            <WindowManager />
        </div>
)};


export default Desktop;