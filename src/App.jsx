import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HeroSection from './components/custom/HeroSection'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* hero */}
      <HeroSection/>
    </>
  )
}

export default App
