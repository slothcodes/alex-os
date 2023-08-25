import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Desktop from './alex-os/components/Desktop'
import StartBar from './alex-os/components/StartBar'

function App() {
  const [count, setCount] = useState(0)

  return (
      <div className='appContainer'>
        <Desktop />
        <StartBar />
      </div>    
  )
}

export default App
