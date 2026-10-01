import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from 'framer-motion';
import { clearCart, remove } from '../../../store/cartSlice.js';

//import css
import "./Cart.css";

//import img
import emptyCart from "../../../assets/logoIcon/illustration-empty-cart.svg";


//import components
import Image from '../LogoIcon/Image';
import CartProducts from '../CartProducts/CartProducts.jsx';
import Modal from '../ModalsComponent/ModalLayoutsComponent/ModalComponent/Modal';
import CartConfirmModal from '../ModalsComponent/ModalsContent/CartConfirmModal';
import { RollingNumber } from '../Animated/Animated';
import { useToast } from '../../../context/ToastContext';
import { useCartFx } from '../../../context/CartFxContext';


const fade = {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -16 },
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
};

const Cart = () => {
    const cartList = useSelector(state => state.cartState.cartList);
    const total = useSelector(state => state.cartState.total);
    const count = cartList.reduce((sum, product) => sum + product.quantity, 0);

    const dispatch = useDispatch();
    const { notify } = useToast();
    const { confetti } = useCartFx();
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const closeModal = useCallback(() => setIsConfirmOpen(false), []);

    const handleRemoveProduct = (product) => {
        dispatch(remove(product.id));
        notify({ title: `${product.name} removed`, type: 'remove' });
    };

    const handleClearCart = () => {
        dispatch(clearCart());
        notify({ title: 'Cart cleared', message: 'Your cart is empty again.', type: 'remove' });
    };

    const handleOrderComplete = () => {
        setIsConfirmOpen(false);
        dispatch(clearCart());
        confetti();
        notify({ title: 'Order confirmed!', message: 'Your invoice has been downloaded.', type: 'success', duration: 4500 });
    };

    return (
        <motion.aside
            id="cart"
            className="cartSection"
            aria-labelledby="cart-title"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
            <h2 id="cart-title" className="cartHeaderText">
                Your Cart <span className="cartCount">(<RollingNumber value={count} />)</span>
            </h2>

            <AnimatePresence mode="wait" initial={false}>
                {cartList.length === 0 ? (
                    <motion.div key="empty" className="cartEmpty" {...fade}>
                        <motion.div
                            className="cartEmptyImage"
                            animate={{ y: [0, -10, 0], rotate: [0, -3, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            <Image src={emptyCart} alt="Empty cart illustration" />
                        </motion.div>
                        <p className="cartEmptyText">Your added items will appear here</p>
                    </motion.div>
                ) : (
                    <motion.div key="filled" {...fade}>
                        <CartProducts
                            products={cartList}
                            total={total}
                            onRemove={handleRemoveProduct}
                            onClear={handleClearCart}
                            onConfirm={() => setIsConfirmOpen(true)}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Modal for CartConfirmModal */}
            <Modal isOpen={isConfirmOpen} onClose={closeModal} labelledBy="confirm-title">
                <CartConfirmModal
                    products={cartList}
                    total={total}
                    onClose={closeModal}
                    onComplete={handleOrderComplete}
                />
            </Modal>
        </motion.aside>
    )
}

export default Cart
