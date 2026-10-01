import React from 'react'
import { motion } from 'framer-motion';


//import css
import "./ModalOverlay.css";

const ModalOverlay = ({ children, onClose, isSheet }) => {
    return (
        <motion.div
            className={`modalOverlay ${isSheet ? 'isSheet' : ''}`}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
        >
            {children}
        </motion.div>
    );
}

export default ModalOverlay
