import React from 'react'
import { Outlet } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'

import Header from './components/layouts/Header/Header'
import Footer from './components/layouts/Footer/Footer'
import ScrollToTopBtn from './components/layouts/Buttons/ScrollToTopBtn/ScrollToTopBtn'
import { CartFxProvider } from './context/CartFxContext'
import { ToastProvider } from './context/ToastContext'

const Root = () => {
    return (
        <MotionConfig reducedMotion="user">
            <ToastProvider>
                <CartFxProvider>
                    <div className="appShell">
                        <Header />
                        <Outlet />
                        <Footer />
                        <ScrollToTopBtn />
                    </div>
                </CartFxProvider>
            </ToastProvider>
        </MotionConfig>
    )
}

export default Root
