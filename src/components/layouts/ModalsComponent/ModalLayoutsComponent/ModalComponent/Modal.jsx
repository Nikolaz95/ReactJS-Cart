import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from "react-dom";
import { AnimatePresence, motion } from 'framer-motion';

//import css
import "./Modal.css";

//import components
import ModalOverlay from '../ModalOverlay/ModalOverlay';

const SHEET_QUERY = '(max-width: 639px)';

const dialogVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 40 },
    visible: { opacity: 1, scale: 1, y: 0 },
};

const sheetVariants = {
    hidden: { y: '100%' },
    visible: { y: 0 },
};

const Modal = ({ children, isOpen, onClose, labelledBy, className = '' }) => {
    const contentRef = useRef(null);
    const [isSheet, setIsSheet] = useState(() => window.matchMedia(SHEET_QUERY).matches);

    useEffect(() => {
        const media = window.matchMedia(SHEET_QUERY);
        const handleChange = () => setIsSheet(media.matches);
        media.addEventListener('change', handleChange);
        return () => media.removeEventListener('change', handleChange);
    }, []);

    // Close modal on `Esc` key press and lock page scroll while open
    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (e) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";
        contentRef.current?.focus();

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [isOpen, onClose]);

    return ReactDOM.createPortal(
        <AnimatePresence>
            {isOpen && (
                <ModalOverlay onClose={onClose} isSheet={isSheet}>
                    <motion.div
                        ref={contentRef}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby={labelledBy}
                        tabIndex={-1}
                        className={`modalContent ${isSheet ? 'isSheet' : ''} ${className}`}
                        // Prevent closing modal when clicking inside content
                        onClick={(e) => e.stopPropagation()}
                        variants={isSheet ? sheetVariants : dialogVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                    >
                        {children}
                    </motion.div>
                </ModalOverlay>
            )}
        </AnimatePresence>,
        document.body
    )
}

export default Modal
