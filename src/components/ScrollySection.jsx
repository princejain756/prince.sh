import { useMemo, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HeroSection from './HeroSection'
import PortfolioBrands from './PortfolioBrands'

// Total number of frames
const TOTAL_FRAMES = 40

// Preload all frame paths
const framePaths = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
    const num = String(i + 1).padStart(3, '0')
    return `/frames/ezgif-frame-${num}.jpg`
})

// Competition messages based on frame ranges
const getCompetitionMessage = (frame) => {
    if (frame < 5) return { title: "YOUR COMPETITION", subtitle: "holding you back...", key: 0 }
    if (frame < 10) return { title: "THE OLD WAY", subtitle: "is getting thrown out", key: 1 }
    if (frame < 15) return { title: "THROW IT AWAY", subtitle: "leave competitors behind", key: 2 }
    if (frame < 20) return { title: "GOODBYE", subtitle: "competition", key: 3 }
    if (frame < 25) return { title: "GONE.", subtitle: "time to build YOUR brand", key: 4 }
    return null
}

function ScrollySection({ scrollProgress }) {
    const audioRef = useRef(null)
    const lastBrandRef = useRef(-1)
    const [imagesLoaded, setImagesLoaded] = useState(false)

    // Preload all images on mount
    useEffect(() => {
        const preloadImages = () => {
            let loadedCount = 0
            framePaths.forEach((src) => {
                const img = new Image()
                img.src = src
                img.onload = () => {
                    loadedCount++
                    if (loadedCount === TOTAL_FRAMES) {
                        setImagesLoaded(true)
                    }
                }
            })
        }
        preloadImages()
    }, [])

    // Calculate current frame based on scroll progress
    const currentFrame = useMemo(() => {
        const frameIndex = Math.min(
            Math.floor(scrollProgress * TOTAL_FRAMES),
            TOTAL_FRAMES - 1
        )
        return Math.max(0, frameIndex)
    }, [scrollProgress])

    // Determine which phase we're in
    const phase = useMemo(() => {
        if (currentFrame < 25) return 'competition'
        if (currentFrame < 35) return 'companies'
        return 'hero'
    }, [currentFrame])

    // Get competition message for current frame
    const competitionMessage = useMemo(() => {
        return getCompetitionMessage(currentFrame)
    }, [currentFrame])

    // Calculate which brand to show (0-2)
    const currentBrand = useMemo(() => {
        if (currentFrame < 26) return -1
        if (currentFrame < 29) return 0
        if (currentFrame < 32) return 1
        if (currentFrame < 35) return 2
        return 3
    }, [currentFrame])

    // Play sound only when first company appears
    useEffect(() => {
        if (currentBrand === 0 && lastBrandRef.current === -1) {
            lastBrandRef.current = currentBrand
            if (audioRef.current) {
                audioRef.current.pause()
                audioRef.current.currentTime = 0
            }
            audioRef.current = new Audio('/sound.mp3')
            audioRef.current.volume = 0.3
            audioRef.current.play().catch(() => { })
        } else if (currentBrand >= 0) {
            lastBrandRef.current = currentBrand
        }
    }, [currentBrand])

    return (
        <div className="scrolly-container">
            <div className="scrolly-sticky">
                {/* Background Frame - no animation, just swap src */}
                <img
                    src={framePaths[currentFrame]}
                    alt="Animation frame"
                    className="frame-canvas"
                    style={{ opacity: imagesLoaded ? 1 : 0 }}
                />

                {/* Overlay Content */}
                <div className="overlay-content">
                    {/* Competition phase - only animate on message change */}
                    {phase === 'competition' && competitionMessage && (
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={competitionMessage.key}
                                className="competition-overlay"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                <h2 className="competition-title">{competitionMessage.title}</h2>
                                <p className="competition-subtitle">{competitionMessage.subtitle}</p>
                            </motion.div>
                        </AnimatePresence>
                    )}

                    {/* Companies phase - only animate on brand change */}
                    {phase === 'companies' && (
                        <PortfolioBrands currentBrand={currentBrand} />
                    )}

                    {/* Hero phase - single animation */}
                    {phase === 'hero' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            style={{ width: '100%', height: '100%' }}
                        >
                            <HeroSection />
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ScrollySection
