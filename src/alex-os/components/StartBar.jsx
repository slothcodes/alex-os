import React, { useState, useEffect, useRef} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { minimizeWindow } from "../../actions/windowActions";
import { getWindows } from '../../selectors/windowSelectors';
import './StartBar.css';

const StartBar = ({windows, onWindowClick, menuItemOpen}) => {
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const startMenuRef = useRef(null);
    const startButtonRef = useRef(null);
    const dispatch = useDispatch();

    // get list of minimized windows
    const openWindowsList = useSelector(getWindows);

    useEffect(() => {
        const timer = setInterval(() => {
            const options = {hour: '2-digit', minute: '2-digit'};
            setCurrentTime(new Date().toLocaleTimeString(undefined,options));
        }, 1000);
        return () => clearInterval(timer);
    }, []);
    const handleButtonClick = () => {
        setIsMenuOpen(!isMenuOpen)
    };
    useEffect(() => {
        function handleClickOutside(event) {
            if (startMenuRef.current && !startMenuRef.current.contains(event.target) && !startButtonRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        }
    
        document.addEventListener("mousedown", handleClickOutside);
    
        // Cleanup the event listener on component unmount
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return (
        <div className="start-bar">
            { isMenuOpen && (
                <div className="start-menu" ref={startMenuRef}>
                    <ul className="menu-group">
                        <a href="https://github.com/slothcodes" target="blank"><img src="../public/icons8-github-48.svg" alt="Github"/>GitHub</a>
                        <a href="https://www.linkedin.com/" target="blank"><img src="../public/icons8-linkedin-48.svg" alt="LinkedIn"/>LinkedIn</a>
                        <button onClick={()=> {menuItemOpen('Article Writer'), setIsMenuOpen(false)}}><img src="../public/icons8-typewriter-40.png" alt="Article Writer"/>Article Writer</button>
                        <button onClick={()=> {menuItemOpen('News Reader'), setIsMenuOpen(false)}}> <img src="../public/icons8-newspaper-48.png" alt="News Reader"/>News Reader</button>
                    </ul>
                    
                </div>
            )}
            <button className="start-button" ref={startButtonRef} onClick={handleButtonClick}>Start</button>
            <div className="minimized-windows">
                {openWindowsList.map((window) => (
                    window.isMinimized && <button
                        key={window.id}
                        onClick={() => dispatch(minimizeWindow(window.id))}
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
    