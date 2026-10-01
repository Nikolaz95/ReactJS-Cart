import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'

//import css
import './ScrollToTopBtn.css';

import useScrollToTop from '../../../hooks/useScrollToTop';
import { ArrowUpIcon } from '../../Icons/Icons';

const ScrollToTopBtn = () => {
    const { isVisible } = useScrollToTop();

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    className="scrollTopBtn"
                    aria-label="Scroll to top"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    initial={{ opacity: 0, scale: 0.4, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.4, y: 30 }}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                    <ArrowUpIcon />
                </motion.button>
            )}
        </AnimatePresence>
    )
}

export default ScrollToTopBtn
