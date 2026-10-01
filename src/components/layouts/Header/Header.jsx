import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion'

//import css
import "./Header.css";

// import  components
import { CartIcon, CupcakeIcon } from '../Icons/Icons';
import { AnimatedPrice, RollingNumber } from '../Animated/Animated';
import { useCartFx } from '../../../context/CartFxContext';


const Header = () => {
    const cartList = useSelector(state => state.cartState.cartList);
    const total = useSelector(state => state.cartState.total);
    const count = cartList.reduce((sum, product) => sum + product.quantity, 0);

    const { cartTargetRef, bumpKey } = useCartFx();
    const iconControls = useAnimationControls();
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();
    const { pathname } = useLocation();

    // wiggle the cart icon every time a product lands in it
    useEffect(() => {
        if (bumpKey === 0) return;
        iconControls.start({
            scale: [1, 1.3, 0.9, 1.1, 1],
            rotate: [0, -14, 10, -5, 0],
            transition: { duration: 0.6, ease: 'easeOut' },
        });
    }, [bumpKey, iconControls]);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 8);
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleCartClick = (e) => {
        e.preventDefault();
        const cart = document.getElementById('cart');
        if (cart) {
            cart.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            navigate('/');
        }
    };

    return (
        <motion.header
            className={`siteHeader ${scrolled ? 'isScrolled' : ''}`}
            initial={{ y: -90, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 140, damping: 20 }}
        >
            <div className="container headerInner">
                <Link to="/" className="brand" aria-label="Sweet Bites home">
                    <motion.span
                        className="brandMark"
                        whileHover={{ rotate: -12, scale: 1.08 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 12 }}
                    >
                        <CupcakeIcon />
                    </motion.span>
                    <span className="brandText">Sweet<em>Bites</em></span>
                </Link>

                <nav className="headerNav" aria-label="Main">
                    {pathname !== '/' && (
                        <Link to="/" className="headerLink">Menu</Link>
                    )}
                    <motion.a
                        href="#cart"
                        className="headerCartBtn"
                        onClick={handleCartClick}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={`Open cart, ${count} items`}
                    >
                        <motion.span ref={cartTargetRef} animate={iconControls} className="headerCartIcon">
                            <CartIcon />
                            <AnimatePresence>
                                {count > 0 && (
                                    <motion.span
                                        className="headerCartBadge"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                        transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                                    >
                                        <RollingNumber value={count} />
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </motion.span>
                        <span className="headerCartText">
                            <span className="headerCartLabel">Your cart</span>
                            <AnimatedPrice value={total} className="headerCartTotal" />
                        </span>
                    </motion.a>
                </nav>
            </div>
        </motion.header>
    )
}

export default Header
