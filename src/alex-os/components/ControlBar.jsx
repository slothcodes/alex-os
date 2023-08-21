import React from 'react';

// Controls the Window Max, Min And Close Behaviors
const ControlBar = ({onClose, onMax, onMin}) => {
    return (
        <div className='control-bar'>
            <button onClick={onMin} value='min'>-</button>
            <button onClick={onMax} value='max'>#</button>
            <button onClick={onClose} value='close'>x</button>
        </div>
    )
}

export default ControlBar;