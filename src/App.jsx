import React, { useState } from 'react'
import './App.css'
import Desktop from './alex-os/components/Desktop'
import StartBar from './alex-os/components/StartBar'
import LoadingScreen from './LoadingScreen'

function App() {
const [startBarHeight, setStartBarHeight] = React.useState(0);
const startBarRef = React.useRef(null);
const [isLoading, setIsLoading] = useState(true);

React.useEffect(() => {
    if (startBarRef.current) {
        setStartBarHeight(startBarRef.current.offsetHeight);
    }
    setTimeout(() => {
        setIsLoading(false);
    }, 1000);
}, []);

const osComponents = ()=> {
    return (
        <>
            <Desktop startBarHeight={startBarHeight}/>
            <StartBar ref={startBarRef} onHeightChange={setStartBarHeight} startBarHeight={startBarHeight}/>
        </>  
    )
}
const appContent = isLoading ? <LoadingScreen /> : osComponents()
    

return (
      <div className='appContainer'>
        {appContent}
      </div>    
  )
}

export default App
