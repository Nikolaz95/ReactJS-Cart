import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/layouts/Header/Header'
import Footer from './components/layouts/Footer/Footer'

const Root = () => {
    return (
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Root