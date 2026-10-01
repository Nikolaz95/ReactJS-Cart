import React from 'react'
import { add, decrease } from '../../../store/cartSlice.js';
import { useDispatch, useSelector } from "react-redux";

//import css
import './Products.css';

//import components
import ProductCard from './ProductCard';
import useFetchData from '../../hooks/useFetchData';
import Loading from '../Loading/Loading';
import { useCartFx } from '../../../context/CartFxContext';


const Products = () => {
    const { data, loading, error } = useFetchData();
    const cartList = useSelector(state => state.cartState.cartList);
    const dispatch = useDispatch();
    const { flyToCart, burst } = useCartFx();

    const getQuantity = (productId) =>
        cartList.find((item) => item.id === productId)?.quantity || 0;

    const handleAdd = (product, buttonEl, imageEl) => {
        dispatch(add(product)); // Add the product to the cart
        flyToCart(product.image, imageEl);
        if (buttonEl) {
            const rect = buttonEl.getBoundingClientRect();
            burst(rect.left + rect.width / 2, rect.top + rect.height / 2);
        }
    };

    const handleDecrease = (productId) => {
        dispatch(decrease(productId)); // Dispatch decrease action to update Redux cart state
    };

    if (loading) return <Loading />;
    if (error) return <p className="productError">{error}</p>;

    return (
        <div className="productGrid">
            {data.map((product, index) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                    quantity={getQuantity(product.id)}
                    onAdd={handleAdd}
                    onDecrease={handleDecrease}
                />
            ))}
        </div>
    )
}

export default Products
