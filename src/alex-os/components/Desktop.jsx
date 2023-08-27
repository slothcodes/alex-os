import React from 'react';
import WindowManagerRedux from './WindowManagerRedux';
import AppWindow from './AppWindow';
import StartBar from './StartBar';
import ResumeWindow from './ResumeWindow';
import './Desktop.css';
import { useDispatch } from 'react-redux';
import { openWindow, closeWindow, focusWindow } from '../../actions/windowActions.js';
import AboutMeIcon from '../../assets/file48.svg';
import ResumeIcon from '../../assets/icons8-resume-48.png';
import NewsReaderIcon from '../../assets/icons8-newspaper-48.png';
import ArticleWriterIcon from '../../assets/icons8-typewriter-40.png';



const Desktop = (props) => {
    const dispatch = useDispatch();
    const desktopRef = React.useRef(null);
    const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });

    React.useEffect(() => {
        if (desktopRef.current) {
            setDimensions({
                width: desktopRef.current.clientWidth,
                height: desktopRef.current.clientHeight
            });
        }
    }, []);

    const startBarRef = React.useRef(null);
    React.useEffect(() => {
        if (startBarRef.current) {
            const height = `${startBarRef.current.offsetHeight}px`;
            console.log('StartBarheight', height);
            document.documentElement.style.setProperty('--start-bar-height', height);
        }
    }, [startBarRef]);

    const icons = [
        {src: AboutMeIcon, windowId: 'About Me'},
        {src: ResumeIcon, windowId: 'Resume'},
        {src: NewsReaderIcon, windowId: 'News Reader'},
        {src: ArticleWriterIcon, windowId: 'Article Writer'}
    ];
    const startBarHeight = startBarRef.current ? startBarRef.current.offsetHeight : 0;
    return (
        <div className='desktop' ref={desktopRef}> 
            <div className='desktop-background'>
                {icons.map((icon) => {
                return(
                <div className='desktop-icon' key={icon.windowId}>
                    <img
                        src={icon.src}
                        alt={`Icon for ${icon.windowId}`}
                        onClick={() => dispatch(openWindow(icon.windowId))}
                    />
                    <h3>{icon.windowId}</h3>
                </div>
                )
            })} 
            <WindowManagerRedux width={dimensions.width} height={dimensions.height} startBarHeight={props.startBarHeight}/> 
            </div>  
        </div>
    );
};

export default Desktop;
