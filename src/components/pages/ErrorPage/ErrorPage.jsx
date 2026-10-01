import React from 'react'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMoveBack } from '../../hooks/useMoveBack';
import titleName from '../../hooks/useTitle';



//import css
import "./ErrorPage.css";

/* import img */
import Eror from "../../../assets/logoIcon/icon-error.png"

//import components
import Button from '../../layouts/Buttons/Button';
import { ArrowLeftIcon, HomeIcon } from '../../layouts/Icons/Icons';

const digits = ['4', '0', '4'];

const ErrorPage = () => {
    const goBack = useMoveBack();
    titleName(`Error Page`);
    return (
        <main className="erorContent">
            <div className="container mainContent">
                <motion.img
                    src={Eror}
                    alt=""
                    className='imgEror'
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 12 }}
                />

                <h1 className="errorCode" aria-label="404">
                    {digits.map((digit, i) => (
                        <motion.span
                            key={i}
                            initial={{ y: 80, opacity: 0 }}
                            animate={{ y: [0, -14, 0], opacity: 1 }}
                            transition={{
                                opacity: { delay: 0.15 + i * 0.12 },
                                y: { delay: 0.15 + i * 0.12, duration: 2.4, repeat: Infinity, ease: 'easeInOut' },
                            }}
                        >
                            {digit}
                        </motion.span>
                    ))}
                </h1>

                <motion.p
                    className='textEror'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    Oops! This page does not exist.
                </motion.p>
                <motion.p
                    className='textErorSub'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    Looks like this dessert was already eaten.
                </motion.p>

                <motion.div
                    className="erorActions"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.75 }}
                >
                    <Button onClick={goBack} variant="ghost">
                        <ArrowLeftIcon /> Go Back
                    </Button>
                    <Link to="/" className="button primary">
                        <HomeIcon /> Back to menu
                    </Link>
                </motion.div>
            </div>
        </main>
    )
}

export default ErrorPage
