import React, { useState, useEffect, useRef} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { minimizeWindow } from "../../actions/windowActions";
import { getWindows } from '../../selectors/windowSelectors';
import GitHubIcon from '../../assets/icons8-github-48.png';
import LinkedInIcon from '../../assets/icons8-linkedin-48.png';
import ArticleWriterIcon from '../../assets/icons8-typewriter-40.png';
import NewsReaderIcon from '../../assets/icons8-newspaper-48.png';
import './StartBar.css';
import { focusWindow } from "../../redux/combinedActions";

const StartBar =  React.forwardRef(({startBarHeight,onHeightChange,menuItemOpen},ref) => {
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const startMenuRef = useRef(null);
    const startButtonRef = useRef(null);
    const dispatch = useDispatch();
    const startBarRef = useRef(null);

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

    React.useEffect(() => {
        if (startBarRef.current) {
            onHeightChange(startBarRef.current ? startBarRef.current.offsetHeight : 0);
        }
    }, []);

    return (
        <div className="start-bar" ref={ref}>
            { isMenuOpen && (
                <div className="start-menu" ref={startMenuRef}>
                    <ul className="menu-group">
                        <a href="https://github.com/slothcodes" target="blank">
                            <span className="menu-icon"><img src={GitHubIcon} alt="Github"/></span>
                            <span className="menu-text">GitHub</span>
                        </a>
                        <a href="https://www.linkedin.com/" target="blank">
                            <span className="menu-icon"><img src={LinkedInIcon} alt="LinkedIn"/></span>
                            <span className="menu-text">LinkedIn</span>
                        </a>
                        <button onClick={()=> {menuItemOpen('Article Writer'), setIsMenuOpen(false)}}>
                            <span className="menu-icon"><img src={ArticleWriterIcon} alt="Article Writer"/></span>
                            <span className="menu-text">Article Writer</span>
                        </button>
                        <button onClick={()=> {menuItemOpen('News Reader'), setIsMenuOpen(false)}}>
                            <span className="menu-icon"><img src={NewsReaderIcon} alt="News Reader"/></span>
                            <span className="menu-text">News Reader</span>
                        </button>
                    </ul>
                    
                </div>
            )}
            <button className="start-button" ref={startButtonRef} onClick={handleButtonClick}>Start</button>
            <div className="minimized-windows">
                {openWindowsList.map((window) => (
                    window.isMinimized && <button
                        key={window.id}
                        onClick={() => dispatch(minimizeWindow(window.id),focusWindow(window.id))}
                    >
                        {window.id}
                    </button>
                ))}
            </div>
            <div className="time">{currentTime}</div>
        </div>
    )
})

export default StartBar;
    