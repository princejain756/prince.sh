import { useState, useRef, useEffect } from 'react'
import ScrollySection from './components/ScrollySection'
import SoundController from './components/SoundController'
import Lenis from 'lenis'
import './App.css'

function App() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [soundEnabled, setSoundEnabled] = useState(false)
  const lenisRef = useRef(null)

  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrentation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    lenisRef.current = lenis

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Track scroll progress
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.min(1, Math.max(0, scrollTop / docHeight))
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      lenis.destroy()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <ScrollySection scrollProgress={scrollProgress} />
      <SoundController 
        scrollProgress={scrollProgress} 
        enabled={soundEnabled}
        onToggle={() => setSoundEnabled(!soundEnabled)}
      />
      {scrollProgress < 0.1 && (
        <div className="scroll-indicator">
          <div className="mouse">
            <div className="wheel"></div>
          </div>
          <span>Scroll</span>
        </div>
      )}
    </>
  )
}

export default App
