import React from 'react'
import { motion } from 'framer-motion'
import useTitle from '../../hooks/useTitle';


//import css
import "./HomePage.css";

//import components
import Hero from '../../layouts/Hero/Hero';
import Products from '../../layouts/ProductComponent/Products';
import Cart from '../../layouts/Cart/Cart';
import MobileCartBar from '../../layouts/MobileCartBar/MobileCartBar';


const HomePage = () => {
    useTitle('Sweet Bites | Dessert Cart');

    return (
        <main className='homePage'>
            <Hero />

            <div className='container shopLayout'>
                <section className='shopProducts' id="desserts" aria-labelledby="desserts-title">
                    <motion.div
                        className='sectionHead'
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <h2 id="desserts-title" className='sectionTitle'>Desserts</h2>
                        <p className='sectionSubtitle'>Handmade every morning — pick your favourites.</p>
                    </motion.div>

                    <Products />
                </section>

                <Cart />
            </div>

            <MobileCartBar />
        </main>
    )
}

export default HomePage
