import React from 'react'
import { AnimatePresence, motion } from 'framer-motion';


//import css
import "./CartProducts.css";
import Button from '../Buttons/Button'

//import img
import carbonNeutral from "../../../assets/logoIcon/icon-carbon-neutral.svg";

//import components
import Image from '../LogoIcon/Image'
import { CheckIcon, CloseIcon, TrashIcon } from '../Icons/Icons';
import { AnimatedPrice, RollingNumber, formatPrice } from '../Animated/Animated';

const CartProducts = ({ products, total, onRemove, onClear, onConfirm }) => {
    return (
        <div className='cartProductSection'>
            <ul className="cartProductList">
                <AnimatePresence initial={false}>
                    {products.map((product) => (
                        <motion.li
                            layout
                            key={product.id}
                            className="cartProductItem"
                            initial={{ opacity: 0, height: 0, x: -24 }}
                            animate={{ opacity: 1, height: 'auto', x: 0 }}
                            exit={{ opacity: 0, height: 0, x: 60, transition: { duration: 0.3 } }}
                            transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                        >
                            <div className="cartProductRow">
                                <img src={product.image} alt="" className="cartProductThumb" />
                                <div className="cartProductInfo">
                                    <h3 className="cartProductName">{product.name}</h3>
                                    <p className="cartProductMeta">
                                        <span className="cartProductQty"><RollingNumber value={product.quantity} />x</span>
                                        <span className="cartProductUnit">@ {formatPrice(product.price)}</span>
                                        <AnimatedPrice value={product.quantity * product.price} className="cartProductTotal" />
                                    </p>
                                </div>
                                <motion.button
                                    className="cartRemoveBtn"
                                    onClick={() => onRemove(product)}
                                    whileHover={{ rotate: 90, scale: 1.1 }}
                                    whileTap={{ scale: 0.85 }}
                                    aria-label={`Remove ${product.name} from cart`}
                                >
                                    <CloseIcon />
                                </motion.button>
                            </div>
                        </motion.li>
                    ))}
                </AnimatePresence>
            </ul>

            <motion.div layout className="orderTotalContent">
                <p className="orderTotalText">Order Total</p>
                <AnimatedPrice value={total} className="orderTotalPrice" />
            </motion.div>

            <motion.div layout className="carbonNeutral">
                <Image src={carbonNeutral} alt="" className="carbonIcon" />
                <p>This is a <b>carbon-neutral</b> delivery</p>
            </motion.div>

            <motion.div layout className="confirmButton">
                <Button variant="primary block" onClick={onConfirm}>
                    Confirm Order <CheckIcon />
                </Button>
                <Button variant="ghost block" onClick={onClear}>
                    Clear Cart <TrashIcon />
                </Button>
            </motion.div>
        </div>
    )
}

export default CartProducts
