import { motion, AnimatePresence } from 'framer-motion'

const brands = [
    {
        name: 'adelev8',
        logo: '/adelev8.png',
        logoWidth: 1221,
        logoHeight: 331,
        alt: 'adelev8 logo',
        description: "Performance‑driven marketing agency scaling startups and SMEs using SEO, PPC, and data-driven growth strategies."
    },
    {
        name: 'Maninfini',
        logo: '/maninfini.webp',
        logoWidth: 1220,
        logoHeight: 572,
        alt: 'Maninfini logo',
        description: "Business automation and digital solutions company providing website development and tech‑driven operational scaling."
    },
    {
        name: 'sarojjain',
        logo: '/sarojjain.png',
        logoWidth: 360,
        logoHeight: 79,
        alt: 'Saroj Jain logo',
        description: "Ethnic fashion label blending traditional Indian craftsmanship with contemporary silhouettes for modern celebrations."
    },
    {
        name: 'Quantiti',
        logo: '/quantitilogo.webp',
        logoWidth: 400,
        logoHeight: 400,
        alt: 'Quantiti logo',
        description: "Quantitative intelligence engine combining AI/ML models with classical quant finance for trading signals, risk analytics, and portfolio optimization. Not providing financial or investment advice."
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
                            alt={brand.alt}
                            width={brand.logoWidth}
                            height={brand.logoHeight}
                            className="brand-logo-large"
                            decoding="async"
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
