import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { AnimatePresence, motion } from 'framer-motion'

//import css
import './MobileCartBar.css';

import { CartIcon } from '../Icons/Icons';
import { AnimatedPrice, RollingNumber } from '../Animated/Animated';

/* Floating "view cart" bar for tablets and phones, hidden while the cart itself is on screen */
const MobileCartBar = () => {
    const cartList = useSelector(state => state.cartState.cartList);
    const total = useSelector(state => state.cartState.total);
    const count = cartList.reduce((sum, product) => sum + product.quantity, 0);
    const [cartInView, setCartInView] = useState(false);

    useEffect(() => {
        const cart = document.getElementById('cart');
        if (!cart) return;
        const observer = new IntersectionObserver(
            ([entry]) => setCartInView(entry.isIntersecting),
            { threshold: 0.1 }
        );
        observer.observe(cart);
        return () => observer.disconnect();
    }, []);

    const show = count > 0 && !cartInView;

    return (
        <AnimatePresence>
            {show && (
                <motion.button
                    className="mobileCartBar"
                    onClick={() => document.getElementById('cart')?.scrollIntoView({ behavior: 'smooth' })}
                    initial={{ y: 120, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 120, opacity: 0 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                >
                    <span className="mobileCartIcon">
                        <CartIcon />
                        <span className="mobileCartBadge"><RollingNumber value={count} /></span>
                    </span>
                    <span className="mobileCartLabel">View cart</span>
                    <AnimatedPrice value={total} className="mobileCartTotal" />
                </motion.button>
            )}
        </AnimatePresence>
    )
}

export default MobileCartBar
