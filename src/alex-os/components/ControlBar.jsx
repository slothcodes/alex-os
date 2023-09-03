import React from 'react';
import Max_Window_Icon from '../../assets/icons8-maximize-window-48.png';
import Min_Window_Icon from '../../assets/icons8-minimize-window-48.png';
import Close_Window_Icon from '../../assets/icons8-close-window-48.png';
import './ControlBar.css'

// Controls the Window Max, Min And Close Behaviors
const ControlBar = ({onClose, onMax, onMin,mobileView,id}) => {
    const onMaxButton = !mobileView ? <button onClick={onMax} value='max'><img src={Max_Window_Icon} alt='Maximize Window'/></button> : '';
    return (
        <div className='control-bar'>
            <div className='control-bar-controls'>
                <button className='no-select' onClick={onMin} value='min'><img src={Min_Window_Icon} alt='Minimize Window'/></button>
                {onMaxButton}
                <button onClick={onClose} value='close'><img src={Close_Window_Icon} alt='Close Window'/></button>
            </div>
            
        </div>
    )
}

export default ControlBar;