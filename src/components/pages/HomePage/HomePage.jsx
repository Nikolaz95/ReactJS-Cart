import React, { useState } from 'react'


//import css
import "./HomePage.css";

//import components
import Products from '../../layouts/ProductComponent/Products';
import Cart from '../../layouts/Cart/Cart';
import CartProducts from '../../layouts/CartProducts/CartProducts';
import Invoice from '../../layouts/InvoicePDF/Invoice';


const HomePage = () => {
    const [itemCount, setItemCount] = useState({});
    return (
        <section className='homePageSection'>

            <main className='homePageMain'>
                <div className='homePageHeaderContent'>
                    <h1 className='homePageHeader'>Desserts :</h1>
                </div>
                <section className='homePageMainContentSection'>

                    <Products itemCount={itemCount} setItemCount={setItemCount} />


                    <Cart itemCount={itemCount} setItemCount={setItemCount} />

                </section>
            </main>
        </section>
    )
}

export default HomePage