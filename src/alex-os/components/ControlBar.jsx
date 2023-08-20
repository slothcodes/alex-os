import React from 'react';

// Controls the Window Max, Min And Close Behaviors
const ControlBar = ({onClose, onMax, onMin}) => {
    return (
        <div className='control-bar'>
            <button onClick={onMin}>-</button>
            <button onClick={onMax}>#</button>
            <button onClick={onClose}>x</button>
        </div>
    )
}

export default ControlBar;