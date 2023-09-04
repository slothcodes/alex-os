import React from 'react';
import WindowManagerRedux from './WindowManagerRedux';
import './Desktop.css';
import { useDispatch } from 'react-redux';
import { openWindow, closeWindow, focusWindow } from '../../actions/windowActions.js';
import AboutMeIcon from '../../assets/file48.svg';
import ResumeIcon from '../../assets/icons8-resume-48.png';
import NewsReaderIcon from '../../assets/icons8-newspaper-48.png';
import ArticleWriterIcon from '../../assets/icons8-typewriter-40.png';
import ReactProjectIcon from '../../assets/icons8-physics-book-48.png';


let startingX = 0;
let startingY = 0;
const Desktop = (props) => {
    const dispatch = useDispatch();
    const desktopRef = React.useRef(null);
    const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });
    const [mobileView, setMobileView] = React.useState(false);

    React.useEffect(() => {
        if (desktopRef.current) {
            setDimensions({
                width: desktopRef.current.clientWidth,
                height: desktopRef.current.clientHeight
            });
            if  (desktopRef.current.clientWidth < 600) {
                setMobileView(true);
            }
        }
    }, []);
    const startBarRef = React.useRef(null);
    React.useEffect(() => {
        if (startBarRef.current) {
            const height = `${startBarRef.current.offsetHeight}px`;
            document.documentElement.style.setProperty('--start-bar-height', height);
        }
    }, [startBarRef]);

    const icons = [
        {src: ResumeIcon, windowId: 'Resume'},
        {src: NewsReaderIcon, windowId: 'News Reader'},
        {src: ArticleWriterIcon, windowId: 'Article Writer'},
        {src: ReactProjectIcon, windowId: 'REACT Projects'}
    ];
    const startBarHeight = startBarRef.current ? startBarRef.current.offsetHeight : 0;
    // set starting position for windows
    if (!mobileView) {
        startingX = dimensions.width / 2
        startingY = dimensions.height / 10
    }

    return (
        <div className='desktop' ref={desktopRef}> 
            <div className='desktop-background'>
                {icons.map((icon) => {
                return(
                <div className='desktop-icon no-select' key={icon.windowId}>
                    <div>
                    <img
                        src={icon.src}
                        alt={`Icon for ${icon.windowId}`}
                        onClick={() => dispatch(openWindow(icon.windowId,startingX,startingY,mobileView))}
                    />
                    <h3>{icon.windowId}</h3>
                    </div>
                </div>
                )
            })} 
             </div> 
             <WindowManagerRedux width={dimensions.width} height={dimensions.height} startBarHeight={props.startBarHeight} mobileView={mobileView}/> 
           
        </div>
    );
};

export default Desktop;
