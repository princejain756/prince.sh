import { useMemo, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HeroSection from './HeroSection'
import PortfolioBrands from './PortfolioBrands'

// Total number of frames
const TOTAL_FRAMES = 41

// Preload all frame paths
const framePaths = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
    const num = String(i + 1).padStart(3, '0')
    return `/frames/ezgif-frame-${num}.webp`
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
    const canvasRef = useRef(null)
    const imagesRef = useRef([])
    const [imagesLoaded, setImagesLoaded] = useState(false)

    // Preload all images on mount
    useEffect(() => {
        let loadedCount = 0
        const total = framePaths.length

        // Initialize image objects
        imagesRef.current = framePaths.map(src => {
            const img = new Image()
            img.src = src
            img.onload = () => {
                loadedCount++
                if (loadedCount === total) {
                    setImagesLoaded(true)
                }
            }
            return img
        })
    }, [])

    // Calculate current frame based on scroll progress
    const currentFrame = useMemo(() => {
        let frameIndex = 0

        // Total frames = 41
        // 0-26: Competition (26 frames) -> alloc 35% scroll (0.0 - 0.35)
        // 26-36: Companies (10 frames) -> alloc 40% scroll (0.35 - 0.75)
        // 36-40: Hero (5 frames) -> alloc 25% scroll (0.75 - 1.0)

        if (scrollProgress < 0.35) {
            // Range 0 to 0.35 maps to 0 to 26
            frameIndex = (scrollProgress / 0.35) * 26
        } else if (scrollProgress < 0.75) {
            // Range 0.35 to 0.75 maps to 26 to 36
            frameIndex = 26 + ((scrollProgress - 0.35) / 0.4) * 10
        } else {
            // Range 0.75 to 1.0 maps to 36 to 41
            frameIndex = 36 + ((scrollProgress - 0.75) / 0.25) * 5
        }

        return Math.min(
            Math.floor(frameIndex),
            TOTAL_FRAMES - 1
        )
    }, [scrollProgress])

    // Determine which phase we're in
    const phase = useMemo(() => {
        if (currentFrame < 26) return 'competition'
        if (currentFrame < 36) return 'companies'
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

    // Canvas drawing logic
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas || !imagesLoaded) return

        const ctx = canvas.getContext('2d')
        const img = imagesRef.current[currentFrame]

        if (!img) return

        // Handle high-DPI displays
        const dpr = window.devicePixelRatio || 1

        const render = () => {
            // Set canvas size to match display size
            const rect = canvas.getBoundingClientRect()
            canvas.width = rect.width * dpr
            canvas.height = rect.height * dpr

            // Normalize coordinate system
            ctx.scale(dpr, dpr)

            // Draw image "cover" style
            const canvasWidth = rect.width
            const canvasHeight = rect.height
            const imgRatio = img.width / img.height
            const canvasRatio = canvasWidth / canvasHeight

            let drawWidth, drawHeight, offsetX, offsetY

            if (canvasRatio > imgRatio) {
                drawWidth = canvasWidth
                drawHeight = canvasWidth / imgRatio
                offsetX = 0
                offsetY = (canvasHeight - drawHeight) / 2
            } else {
                drawWidth = canvasHeight * imgRatio
                drawHeight = canvasHeight
                offsetX = (canvasWidth - drawWidth) / 2
                offsetY = 0
            }

            // Clear and draw
            ctx.clearRect(0, 0, canvasWidth, canvasHeight)
            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)
        }

        render()

        // Handle resize
        const handleResize = () => {
            requestAnimationFrame(render)
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [currentFrame, imagesLoaded])

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
                {/* Canvas for smooth frame rendering */}
                <canvas
                    ref={canvasRef}
                    className="frame-canvas"
                    style={{ opacity: imagesLoaded ? 1 : 0, width: '100%', height: '100%' }}
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
