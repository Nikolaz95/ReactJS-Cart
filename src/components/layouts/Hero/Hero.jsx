import React from 'react'
import { motion } from 'framer-motion'

//import css
import "./Hero.css";

//import img
import macaron from '../../../assets/imgProduct/macaron.jpg';
import waffle from '../../../assets/imgProduct/waffle.jpg';
import tiramisu from '../../../assets/imgProduct/tiramisu.jpg';

//import components
import Button from '../Buttons/Button';
import { ArrowDownIcon, SparkleIcon } from '../Icons/Icons';

const titleWords = ['Sweet', 'moments,', 'baked', 'fresh'];

const floatingImages = [
    { src: waffle, alt: 'Waffle with berries', className: 'heroBubble bubbleOne', delay: 0.5 },
    { src: macaron, alt: 'Macarons', className: 'heroBubble bubbleTwo', delay: 0.7 },
    { src: tiramisu, alt: 'Tiramisu', className: 'heroBubble bubbleThree', delay: 0.9 },
];

const Hero = () => {
    const scrollToDesserts = () => {
        document.getElementById('desserts')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="hero">
            <div className="heroGlow heroGlowOne" aria-hidden="true" />
            <div className="heroGlow heroGlowTwo" aria-hidden="true" />

            <div className="container heroInner">
                <div className="heroCopy">
                    <motion.span
                        className="heroEyebrow"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <SparkleIcon /> Freshly baked every morning
                    </motion.span>

                    <h1 className="heroTitle">
                        {titleWords.map((word, i) => (
                            <span className="heroWordMask" key={word}>
                                <motion.span
                                    className={`heroWord ${i === titleWords.length - 1 ? 'heroWordAccent' : ''}`}
                                    initial={{ y: '110%' }}
                                    animate={{ y: '0%' }}
                                    transition={{ delay: 0.25 + i * 0.09, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    {word}
                                </motion.span>
                            </span>
                        ))}
                    </h1>

                    <motion.p
                        className="heroText"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.65, duration: 0.6 }}
                    >
                        Build your order in seconds, watch it land in your cart and download your invoice in a single click.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                    >
                        <Button variant="primary" onClick={scrollToDesserts}>
                            Browse desserts
                            <motion.span
                                animate={{ y: [0, 4, 0] }}
                                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                                style={{ display: 'inline-flex' }}
                            >
                                <ArrowDownIcon />
                            </motion.span>
                        </Button>
                    </motion.div>
                </div>

                <div className="heroArt" aria-hidden="true">
                    {floatingImages.map((img) => (
                        <motion.div
                            key={img.alt}
                            className={img.className}
                            initial={{ opacity: 0, scale: 0.6, rotate: -10 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ delay: img.delay, type: 'spring', stiffness: 120, damping: 14 }}
                        >
                            <img src={img.src} alt="" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Hero
