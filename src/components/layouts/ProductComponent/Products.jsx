import React, { useState } from 'react'
import { add, decrease } from '../../../store/cartSlice.js';
import { useDispatch, useSelector } from "react-redux";

//import css
import './Products.css';

//import img
import addToCart from "../../../assets/logoIcon/icon-addToCart.png";

//import components
import Image from '../LogoIcon/Image';
import Button from '../Buttons/Button';
import useFetchData from '../../hooks/useFetchData';
import Loading from '../Loading/Loading';


const Products = ({ itemCount, setItemCount }) => {
    const { data, loading, error } = useFetchData();
    console.log(data);

    /* const [itemCount, setItemCount] = useState({}); */

    const dispatch = useDispatch();

    const handleIncrease = (product) => {
        // Increase product quantity in local state and Redux
        setItemCount((prevCount) => ({
            ...prevCount,
            [product.id]: (prevCount[product.id] || 0) + 1,
        }));
        dispatch(add(product));  // Add the product to the cart
    };

    const handleDecrease = (productId) => {
        // Decrease quantity in local state and Redux
        setItemCount((prevCount) => {
            const newCount = { ...prevCount };
            newCount[productId] = Math.max(0, newCount[productId] - 1);
            if (newCount[productId] === 0) {
                delete newCount[productId];
            }
            return newCount;
        });

        dispatch(decrease(productId)); // Dispatch decrease action to update Redux cart state
    };

    const handleAddToCart = (product) => {
        setItemCount((prevCount) => ({
            ...prevCount,
            [product.id]: (prevCount[product.id] || 0) + 1,
        }));
        dispatch(add(product)); // Add the product to the cart
    };

    if (loading) return <Loading />;


    return (
        <main className="productCardSection">
            {data.map((products) => (
                <div className="productCardsContent" key={products.id}>
                    <div className="productCardTop">
                        <Image src={products.image}
                            title={products.name}
                            alt={"here should be a picture"} variant="productImg" />
                    </div>
                    {itemCount[products.id] > 0 ? (
                        <Button variant="countingBtn">
                            <div className='countingBtnContent'>
                                <Button onClick={() => handleDecrease(products.id)} variant="decrease btnDecInc">-</Button>
                                <span className="countNumber">{itemCount[products.id]}</span>
                                <Button onClick={() => handleIncrease(products)} variant="increase btnDecInc">+</Button>
                            </div>
                        </Button>
                    ) : (
                        <Button onClick={() => handleAddToCart(products)} variant="addTocart">
                            <Image src={addToCart} variant="iconImg" />
                            Add To Cart
                        </Button>
                    )}
                    <div className="productCardBottom">
                        <p className="productCardCategory">{products.category}</p>
                        <p className="productCardName">{products.name}</p>
                        <p className="productCardPrice">$ {products.price}</p>
                    </div>
                </div>
            ))}
        </main>
    )
}

export default Products