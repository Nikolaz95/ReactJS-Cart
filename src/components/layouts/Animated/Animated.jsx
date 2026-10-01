import React, { useEffect, useRef } from 'react'
import { AnimatePresence, animate, motion, useMotionValue, useTransform } from 'framer-motion'

import './Animated.css';

export const formatPrice = (value) => `$${Number(value).toFixed(2)}`;

/* Number that rolls up / down like an odometer when it changes */
export const RollingNumber = ({ value, className = '' }) => {
    const previous = useRef(value);
    const direction = value >= previous.current ? 1 : -1;

    useEffect(() => {
        previous.current = value;
    }, [value]);

    return (
        <span className={`rollingNumber ${className}`}>
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.span
                    key={value}
                    custom={direction}
                    variants={{
                        enter: (d) => ({ y: d > 0 ? '100%' : '-100%', opacity: 0 }),
                        center: { y: '0%', opacity: 1 },
                        exit: (d) => ({ y: d > 0 ? '-100%' : '100%', opacity: 0 }),
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ type: 'spring', stiffness: 500, damping: 32 }}
                >
                    {value}
                </motion.span>
            </AnimatePresence>
        </span>
    );
};

/* Price that counts up / down smoothly to its new value */
export const AnimatedPrice = ({ value, className = '' }) => {
    const motionValue = useMotionValue(value);
    const text = useTransform(motionValue, (v) => formatPrice(v));

    useEffect(() => {
        const controls = animate(motionValue, value, { duration: 0.6, ease: [0.22, 1, 0.36, 1] });
        return controls.stop;
    }, [value, motionValue]);

    return <motion.span className={className}>{text}</motion.span>;
};
