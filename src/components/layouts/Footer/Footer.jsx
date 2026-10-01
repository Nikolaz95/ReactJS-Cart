import React from 'react'
import { motion } from 'framer-motion'


//import css
import "./Footer.css";

import useCurrentYear from '../../hooks/useCurrentYear';
import { CupcakeIcon, GithubIcon, LinkedinIcon, MailIcon, MapPinIcon, SparkleIcon } from '../Icons/Icons';

const PORTFOLIO_URL = 'https://nikolazovkoportfolio.netlify.app/#home';
const REPO_URL = 'https://github.com/Nikolaz95/ReactJS-Cart';
const MAP_URL = 'https://www.google.com/maps/place/Stockholm/@59.0968211,17.5065602,7.75z/data=!4m6!3m5!1s0x465f763119640bcb:0xa80d27d3679d7766!8m2!3d59.3293235!4d18.0685808!16zL20vMDZteHM?entry=ttu';

const socials = [
    { href: 'mailto:nikolajoe95@gmail.com', label: 'Gmail', Icon: MailIcon },
    { href: 'https://github.com/Nikolaz95', label: 'GitHub', Icon: GithubIcon },
    { href: 'https://www.linkedin.com/in/nikola-zovko-a50779247/', label: 'LinkedIn', Icon: LinkedinIcon },
];

const column = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    }),
};

const Footer = () => {
    const currentYear = useCurrentYear();
    return (
        <footer className="footerContent">
            <div className="footerWave" aria-hidden="true" />
            <motion.div
                className='container footerMainContent'
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                <motion.div className="footerBrand" custom={0} variants={column}>
                    <span className="footerBrandName">
                        <span className="footerBrandMark"><CupcakeIcon /></span>
                        Sweet<em>Bites</em>
                    </span>
                    <p className="footerTagline">Handmade desserts, baked fresh every morning and delivered carbon-neutral.</p>
                </motion.div>

                <motion.div className="footerAddres" custom={1} variants={column}>
                    <h3 className="footerHeading">Address</h3>
                    <a href={MAP_URL} target="_blank" rel="noreferrer" className="footerLink">
                        <MapPinIcon /> Stockholm, Sweden
                    </a>
                </motion.div>

                <motion.div className="contactFooter" custom={2} variants={column}>
                    <h3 className="footerHeading">Contact</h3>
                    <div className="contactFooterLink">
                        {socials.map(({ href, label, Icon }) => (
                            <motion.a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noreferrer"
                                className="socialLink"
                                title={label}
                                aria-label={label}
                                whileHover={{ y: -5, rotate: -6 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                            >
                                <Icon />
                            </motion.a>
                        ))}
                    </div>
                </motion.div>

                <motion.div className="footerPortfolio" custom={3} variants={column}>
                    <h3 className="footerHeading">Portfolio</h3>
                    <motion.a
                        href={PORTFOLIO_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="portfolioLink"
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                    >
                        <SparkleIcon /> See my portfolio
                        <span className="portfolioArrow" aria-hidden="true">→</span>
                    </motion.a>
                    <a href={REPO_URL} target="_blank" rel="noreferrer" className="footerLink footerRepoLink">
                        <GithubIcon /> Source code on GitHub
                    </a>
                </motion.div>
            </motion.div>

            <div className="container footerMidleContent">
                <p className='footerText'>© {currentYear} by Nikola Zovko. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer
