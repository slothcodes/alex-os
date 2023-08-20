import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Desktop from './alex-os/components/Desktop'

function App() {
  const [count, setCount] = useState(0)

  return (
      <div>
        <Desktop />
      </div>
  )
}

export default App
