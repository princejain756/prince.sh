import { motion } from 'framer-motion'
import { playClickSound } from '../utils/sounds'

function AutoScrollToggle({ enabled, onToggle }) {
    const handleClick = () => {
        playClickSound()
        onToggle()
    }

    return (
        <motion.button
            className="auto-scroll-toggle"
            onClick={handleClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{
                opacity: 0,
                scale: 0.5,
                filter: 'blur(10px)',
                transition: { duration: 0.5, ease: 'easeOut' }
            }}
            transition={{ delay: 0.5 }}
            title={enabled ? "Stop Auto-Scroll" : "Start Auto-Scroll"}
        >
            {enabled ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
            ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
            )}
            <span className="auto-scroll-label">{enabled ? 'PAUSE' : 'AUTO'}</span>
        </motion.button>
    )
}

export default AutoScrollToggle
