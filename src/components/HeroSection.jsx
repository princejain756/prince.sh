import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { playClickSound } from '../utils/sounds'

function HeroSection() {
    const [showContactMenu, setShowContactMenu] = useState(false)
    const [showWebsiteMenu, setShowWebsiteMenu] = useState(false)

    return (
        <div className="hero-container">
            {/* Hero content at top */}
            <motion.div
                className="hero-section"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <motion.h1
                    className="hero-name"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                >
                    PRINCE JAIN
                </motion.h1>

                <motion.p
                    className="hero-tagline"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    Chief Technology Officer & AI Engineer based in <span className="highlight">Bangalore, India</span>
                </motion.p>

                <motion.div
                    className="hero-buttons"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    {/* Contact Menu */}
                    <div className="contact-wrapper" style={{ position: 'relative' }}>
                        <button
                            className="btn-primary"
                            onClick={() => {
                                playClickSound()
                                setShowContactMenu(!showContactMenu)
                                setShowWebsiteMenu(false)
                            }}
                        >
                            <svg className="phone-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                            </svg>
                            GET IN TOUCH
                        </button>

                        <AnimatePresence>
                            {showContactMenu && (
                                <motion.div
                                    className="contact-menu"
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <a href="mailto:p@prince.sh" className="contact-item">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                            <polyline points="22,6 12,13 2,6"></polyline>
                                        </svg>
                                        <span>p@prince.sh</span>
                                    </a>
                                    <a href="https://wa.me/918005634678" target="_blank" rel="noopener noreferrer" className="contact-item">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                                        </svg>
                                        <span>WhatsApp</span>
                                    </a>
                                    <a href="tel:+918005634678" className="contact-item">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                        </svg>
                                        <span>Call +91 80056 34678</span>
                                    </a>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Website Menu */}
                    <div className="website-wrapper" style={{ position: 'relative' }}>
                        <button
                            className="btn-secondary"
                            onClick={() => {
                                playClickSound()
                                setShowWebsiteMenu(!showWebsiteMenu)
                                setShowContactMenu(false)
                            }}
                        >
                            <svg className="phone-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="2" y1="12" x2="22" y2="12"></line>
                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                            </svg>
                            WEBSITE
                        </button>

                        <AnimatePresence>
                            {showWebsiteMenu && (
                                <motion.div
                                    className="contact-menu"
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <a href="https://w.prince.sh" target="_blank" rel="noopener noreferrer" className="contact-item">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                                            <line x1="8" y1="21" x2="16" y2="21"></line>
                                            <line x1="12" y1="17" x2="12" y2="21"></line>
                                        </svg>
                                        <span>WebOS</span>
                                    </a>
                                    <a href="https://w.prince.sh/website" target="_blank" rel="noopener noreferrer" className="contact-item">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                        </svg>
                                        <span>Website</span>
                                    </a>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* Removed Brand Info Display from here */}
            </motion.div>

            {/* Companies at bottom */}
            <motion.div
                className="footer-brands"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
            >
                <a href="https://adelev8.com" target="_blank" rel="noopener noreferrer" className="footer-brand-link">
                    <img src="/adelev8.png" alt="adelev8 logo" width="1221" height="331" className="footer-brand-logo" decoding="async" />
                    <span>adelev8</span>
                </a>
                <a href="https://maninfini.com" target="_blank" rel="noopener noreferrer" className="footer-brand-link">
                    <img src="/maninfini.webp" alt="Maninfini logo" width="1220" height="572" className="footer-brand-logo" decoding="async" />
                    <span>maninfini.com</span>
                </a>
                <a href="https://sarojjain.com" target="_blank" rel="noopener noreferrer" className="footer-brand-link">
                    <img src="/sarojjain.png" alt="Saroj Jain logo" width="360" height="79" className="footer-brand-logo" decoding="async" />
                    <span>sarojjain.com</span>
                </a>
            </motion.div>
        </div>
    )
}

export default HeroSection
