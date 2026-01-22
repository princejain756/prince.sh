import { useState, useRef, useEffect, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import ScrollySection from './components/ScrollySection'
import AutoScrollToggle from './components/AutoScrollToggle'
import useImageProtection from './hooks/useImageProtection'
import Lenis from 'lenis'
import './App.css'

function App() {
  // Enable image download protection
  useImageProtection()

  const [scrollProgress, setScrollProgress] = useState(0)
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(false)
  const lenisRef = useRef(null)
  const autoScrollRef = useRef(null)

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

  // Auto-scroll functionality using Lenis for smooth scrolling
  useEffect(() => {
    if (autoScrollEnabled && lenisRef.current) {
      const scrollSpeed = 3 // pixels per frame (faster)

      const autoScroll = () => {
        const currentScroll = window.scrollY
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight

        if (currentScroll < maxScroll - 10) {
          // Use Lenis's scroll method for smoothness
          lenisRef.current.scrollTo(currentScroll + scrollSpeed, { immediate: true })
          autoScrollRef.current = requestAnimationFrame(autoScroll)
        } else {
          // Reached the end, disable auto-scroll
          setAutoScrollEnabled(false)
        }
      }

      autoScrollRef.current = requestAnimationFrame(autoScroll)
    } else {
      if (autoScrollRef.current) {
        cancelAnimationFrame(autoScrollRef.current)
        autoScrollRef.current = null
      }
    }

    return () => {
      if (autoScrollRef.current) {
        cancelAnimationFrame(autoScrollRef.current)
      }
    }
  }, [autoScrollEnabled])

  const handleAutoScrollToggle = useCallback(() => {
    setAutoScrollEnabled(prev => !prev)
  }, [])

  return (
    <>
      <ScrollySection scrollProgress={scrollProgress} />
      <AnimatePresence>
        {scrollProgress < 0.9 && (
          <AutoScrollToggle
            enabled={autoScrollEnabled}
            onToggle={handleAutoScrollToggle}
          />
        )}
      </AnimatePresence>
      {scrollProgress < 0.1 && !autoScrollEnabled && (
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
