import React, { useState } from 'react'
import './App.css'
import Desktop from './alex-os/components/Desktop'
import StartBar from './alex-os/components/StartBar'

function App() {
const [startBarHeight, setStartBarHeight] = React.useState(0);
const startBarRef = React.useRef(null);

React.useEffect(() => {
    if (startBarRef.current) {
        setStartBarHeight(startBarRef.current.offsetHeight);
    }
}, []);
    console.log('startBarHeight', startBarHeight);
  return (
      <div className='appContainer'>
          <Desktop startBarHeight={startBarHeight}/>
          <StartBar ref={startBarRef} onHeightChange={setStartBarHeight} startBarHeight={startBarHeight}/>
      </div>    
  )
}

export default App
