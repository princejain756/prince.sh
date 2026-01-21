import { motion, AnimatePresence } from 'framer-motion'

const brands = [
    {
        name: 'adelev8',
        logo: '/adelev8.png',
        description: "Performance‑driven marketing agency scaling startups and SMEs using SEO, PPC, and data-driven growth strategies."
    },
    {
        name: 'Maninfini',
        logo: '/maninfini.png',
        description: "Business automation and digital solutions company providing website development and tech‑driven operational scaling."
    },
    {
        name: 'sarojjain',
        logo: '/sarojjain.png',
        description: "Ethnic fashion label blending traditional Indian craftsmanship with contemporary silhouettes for modern celebrations."
    },
]

function PortfolioBrands({ currentBrand }) {
    // Only show brand if valid index
    if (currentBrand < 0 || currentBrand >= brands.length) return null

    const brand = brands[currentBrand]

    return (
        <div className="brands-overlay">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentBrand}
                    className="brand-display"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                    <div className="brand-header">
                        <img
                            src={brand.logo}
                            alt={`${brand.name} logo`}
                            className="brand-logo-large"
                        />
                        <span className="brand-name-large">
                            {brand.name}
                        </span>
                    </div>
                    <p className="brand-description-overlay">
                        {brand.description}
                    </p>
                </motion.div>
            </AnimatePresence>
        </div>
    )
}

export default PortfolioBrands
