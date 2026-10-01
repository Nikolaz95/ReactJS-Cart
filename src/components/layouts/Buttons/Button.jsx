import React from 'react'
import { motion } from 'framer-motion'

//import css
import './Button.css';

const Button = ({ onClick, children, variant = '', className = '', type = 'button', ...props }) => {
    return (
        <motion.button
            type={type}
            onClick={onClick}
            whileTap={{ scale: 0.96 }}
            className={`button ${variant} ${className}`.trim()}
            {...props}>
            {children}
        </motion.button>
    )
}

export default Button
