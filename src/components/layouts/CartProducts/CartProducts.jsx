import React, { useState } from 'react'
import { decrease, clearCart, remove } from '../../../store/cartSlice.js';
import { useDispatch } from 'react-redux';


//import css
import "./CartProducts.css";
import Button from '../Buttons/Button'
import Image from '../LogoIcon/Image'

//import img
import cancel from "../../../assets/logoIcon/icon-cancelPic.png";
import confirm from "../../../assets/logoIcon/icon-confirm.png";
import removeCart from "../../../assets/logoIcon/icon-remove-order.png";
import carbonNeutral from "../../../assets/logoIcon/icon-carbon-neutral.svg";
import Modal from '../ModalsComponent/ModalLayoutsComponent/ModalComponent/Modal';
import CartConfirmModal from '../ModalsComponent/ModalsContent/CartConfirmModal';

const CartProducts = ({ products, total, itemCount, setItemCount }) => {

    const dispatch = useDispatch();

    const handleClearCart = () => {
        dispatch(clearCart());
        setItemCount({})
    }

    const handleRemoveProduct = (productId) => {
        dispatch(remove(productId));
        setItemCount((prevCount) => {
            const newCount = { ...prevCount };
            delete newCount[productId]; // Remove the product from itemCount state
            return newCount;
        });
    }

    // State to track which modal is open
    const [activeModal, setActiveModal] = useState("");
    // Function to close the modal
    const closeModal = () => setActiveModal("");
    return (
        <main className='cartProductSection'>
            <div className="cartProductSectionContent">
                {products.map((product) => {
                    const totalProductCost = product.quantity * product.price;

                    return (
                        <div className="cartProductInfoContent" key={product.id}>
                            <h3>{product.name}</h3>
                            <div className="cartProductInfoSection">
                                <p>{product.quantity} x</p>
                                <p>$ {product.price}</p>
                                <p>$ {totalProductCost.toFixed(2)}</p> {/* Display the total cost */}
                                <Button variant="modalCloseX" onClick={() => handleRemoveProduct(product.id)}>
                                    <Image src={cancel} alt={"here should be a picture"} variant="iconCartXImg" />
                                </Button>
                            </div>
                            <div className="articleSeperator"></div>
                        </div>
                    );
                })}
                <div className="orderTotalContent">
                    <p className="orderTotalText">Order Total</p>
                    <p className="orderTotalPrice">$ {total} </p>
                </div>

                <div className="carbonNeutral">
                    <Image src={carbonNeutral} alt={"he"} variant="iconImg" />
                    <p>This is a <b>carbon-neutral</b>  delivery</p>
                </div>
                <div className="confirmButton">
                    <Button variant="confirmOrder"
                        onClick={() => setActiveModal("orderConfirm")}>
                        Confirm Order
                        <Image src={confirm} alt={"here should be a picture"} variant="iconImg" />
                    </Button>
                    <Button variant="clearcart" onClick={handleClearCart}>
                        Clear Cart
                        <Image src={removeCart} alt={"here should be a picture"} variant="iconImg" />
                    </Button>
                </div>
            </div>
            {/* Modal for CartConfirmModal */}
            <Modal isOpen={activeModal === "orderConfirm"} onClose={closeModal}>
                <CartConfirmModal handleClearCart={handleClearCart} onClose={closeModal} total={total} products={products} />
            </Modal>
        </main>
    )
}

export default CartProducts