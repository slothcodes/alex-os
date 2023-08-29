import React from 'react';
import './ControlBar.css'

// Controls the Window Max, Min And Close Behaviors
const ControlBar = ({onClose, onMax, onMin,mobileView,id}) => {
    const onMaxButton = !mobileView ? <button onClick={onMax} value='max'>#</button> : '';
    return (
        <div className='control-bar'>
            <div className='control-bar-controls'>
                <button className='no-select' onClick={onMin} value='min'>-</button>
                {onMaxButton}
                <button onClick={onClose} value='close'>x</button>
            </div>
            
        </div>
    )
}

export default ControlBar;