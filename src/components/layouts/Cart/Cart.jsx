import React, { useState } from 'react'
import { useSelector } from "react-redux";

//import css
import "./Cart.css";

//import img
import product from "../../../assets/logoIcon/illustration-empty-cart.svg";


//import components
import Image from '../LogoIcon/Image';
import CartProducts from '../CartProducts/CartProducts.jsx';



const Cart = ({ itemCount, setItemCount }) => {
    const cartList = useSelector(state => state.cartState.cartList);
    const total = useSelector(state => state.cartState.total)

    return (
        <main className="cartSection">
            {cartList.length === 0 ? (
                <div className="cartContent">
                    <div className="cartMainContent">
                        <div className="imageContent">
                            <Image src={product} alt="Empty cart illustration" variant="productImg" />
                        </div>
                    </div>
                    <div className="cartBottomContent">
                        <div className="cartTextContent">
                            <p>Your added items will appear here</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="cartContent">
                    <h2 className="cartHeaderText">Your Cart ({cartList.length}) :</h2>
                    {/* Pass cartList and total to CartProducts */}
                    <CartProducts products={cartList} total={total} itemCount={itemCount} setItemCount={setItemCount} />
                </div>
            )}
        </main>
    )
}

export default Cart