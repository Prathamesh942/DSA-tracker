import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DSAPatternTracker from './DSAPatternTracker'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <DSAPatternTracker/>
    </>
  )
}

export default App
