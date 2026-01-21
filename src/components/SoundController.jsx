import { useEffect, useRef, useState, useCallback } from 'react'

function SoundController({ scrollProgress, enabled, onToggle }) {
    const audioRef = useRef(null)
    const [isReady, setIsReady] = useState(false)

    // Initialize audio on first user interaction
    const initAudio = useCallback(() => {
        if (!audioRef.current) {
            audioRef.current = new Audio('/sound.mp3')
            audioRef.current.loop = true
            audioRef.current.volume = 0.6
            setIsReady(true)
        }
    }, [])

    // Handle first click to enable audio
    useEffect(() => {
        const handleFirstInteraction = () => {
            initAudio()
            if (audioRef.current && enabled) {
                audioRef.current.play().catch(console.error)
            }
            document.removeEventListener('click', handleFirstInteraction)
            document.removeEventListener('scroll', handleFirstInteraction)
        }

        document.addEventListener('click', handleFirstInteraction, { once: true })
        document.addEventListener('scroll', handleFirstInteraction, { once: true })

        return () => {
            document.removeEventListener('click', handleFirstInteraction)
            document.removeEventListener('scroll', handleFirstInteraction)
            if (audioRef.current) {
                audioRef.current.pause()
                audioRef.current = null
            }
        }
    }, [initAudio, enabled])

    // Toggle play/pause based on enabled state
    useEffect(() => {
        if (!audioRef.current || !isReady) return

        if (enabled) {
            audioRef.current.play().catch(console.error)
        } else {
            audioRef.current.pause()
        }
    }, [enabled, isReady])

    const handleToggle = () => {
        initAudio()
        onToggle()
    }

    return (
        <button
            className="sound-toggle"
            onClick={handleToggle}
            aria-label={enabled ? 'Mute sound' : 'Unmute sound'}
        >
            {enabled ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                </svg>
            ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <line x1="23" y1="9" x2="17" y2="15" />
                    <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
            )}
        </button>
    )
}

export default SoundController
