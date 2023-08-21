import React, { useState, useEffect} from "react";
import './StartBar.css';

const StartBar = ({windows, onWindowClick, menuItemOpen}) => {
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
    const [isMenuOpen, setInMenuOpen] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            const options = {hour: '2-digit', minute: '2-digit'};
            setCurrentTime(new Date().toLocaleTimeString(undefined,options));
        }, 1000);
        return () => clearInterval(timer);
    }, []);
    const handleButtonClick = () => {
        setInMenuOpen(!isMenuOpen)
    };

    return (
        <div className="start-bar">
            { isMenuOpen && (
                <div className="start-menu">
                    <ul className="menu-group">
                        <a href="https://github.com/slothcodes" target="blank"><img src="../public/icons8-github-48.svg" alt="Github"/>GitHub</a>
                        <a href="https://www.linkedin.com/" target="blank"><img src="../public/icons8-linkedin-48.svg" alt="LinkedIn"/>LinkedIn</a>
                        <button onClick={()=> menuItemOpen('Article Writer')}><img src="../public/icons8-typewriter-40.png" alt="Article Writer"/>Article Writer</button>
                        <button onClick={()=> menuItemOpen('News Reader')}> <img src="../public/icons8-newspaper-48.png" alt="News Reader"/>News Reader</button>
                    </ul>
                    
                </div>
            )}
            <button className="start-button" onClick={handleButtonClick}>Start</button>
            <div className="minimized-windows">
                {windows.map((window) => (
                    window.isMinimized && <button
                        key={window.id}
                        onClick={() => onWindowClick(window.id)}
                    >
                        {window.id}
                    </button>
                ))}
            </div>
            <div className="time">{currentTime}</div>
        </div>
    )
}

export default StartBar;
    